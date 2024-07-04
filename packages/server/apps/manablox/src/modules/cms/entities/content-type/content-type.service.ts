import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContentType } from './content-type.model';
import { Model } from 'mongoose';
import { ContentTypeInput } from './content-type.input';
import { isUUID, minLength } from 'class-validator';
import { ContentTypeFieldInput } from '../content-type-field/content-type-field.input';
import { randomUUID } from 'crypto';
import { ContentTypeQueryInput } from './content-type-query.input';
import { PaginatedContentTypes } from './paginated-content-types.type';

@Injectable()
export class ContentTypeService {
  constructor(
    @InjectModel('ContentType')
    private readonly contentTypeModel: Model<ContentType>,
  ) {}

  buildQuery(query: ContentTypeQueryInput[]): Record<string, any> {
    const filter = {};

    for (let i = 0; i < query.length; i++) {
      const filterKeys = Object.keys(query[i]);

      for (let j = 0; j < filterKeys.length; j++) {
        const filterKey = filterKeys[j];
        const filterValue = query[i][filterKey];
        filter[filterKey] = filterValue;
      }
    }

    return filter;
  }

  async findAll(): Promise<ContentType[]> {
    const items = await this.contentTypeModel.find().exec();
    return items.map((item) => item.toJSON());
  }

  async findPaginated(
    query: ContentTypeQueryInput[],
    limit: number,
    page: number,
  ): Promise<PaginatedContentTypes> {
    const filter = this.buildQuery(query);

    const total = await this.contentTypeModel.countDocuments(filter).exec();
    const items = await this.contentTypeModel
      .find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    return {
      total,
      page,
      limit,
      items: items.map((item) => item.toJSON()),
    };
  }

  async find(query: any): Promise<ContentType[]> {
    const items = await this.contentTypeModel.find(query).exec();
    return items.map((item) => item.toJSON());
  }

  async findOne(query: any): Promise<ContentType> {
    const contentType = await this.contentTypeModel.findOne(query).exec();
    if (!contentType) return null;
    return contentType.toJSON();
  }

  async findById(contentTypeId: string): Promise<ContentType> {
    const contentType = await this.contentTypeModel
      .findOne({ contentTypeId: contentTypeId })
      .exec();
    if (!contentType) return null;
    return contentType.toJSON();
  }

  async filter(query: ContentTypeQueryInput[]): Promise<ContentType[]> {
    return this.find(this.buildQuery(query));
  }

  async create(contentType: ContentTypeInput): Promise<ContentType> {
    await this.validateAndSanitizeInput(contentType);

    if (contentType.fields) {
      for (let i = 0; i < contentType.fields.length; i++) {
        const field = contentType.fields[i];
        switch (field.type) {
          case 'StringFieldType':
            if (!field.stringSettings) {
              throw new Error('missing stringSettings');
            }
            break;
          case 'NumberFieldType':
            if (!field.numberSettings) {
              throw new Error('missing numberSettings');
            }
            break;
          case 'BooleanFieldType':
            if (!field.booleanSettings) {
              throw new Error('missing booleanSettings');
            }
            break;
          case 'DateFieldType':
            if (!field.dateSettings) {
              throw new Error('missing dateSettings');
            }
            break;
          case 'AssetRelationFieldType':
            if (!field.assetSettings) {
              throw new Error('missing assetSettings');
            }
            break;
          case 'ContentRelationFieldType':
            if (!field.contentSettings) {
              throw new Error('missing contentSettings');
            }
            break;
          case 'UserRelationFieldType':
            if (!field.userSettings) {
              throw new Error('missing userSettings');
            }
            break;
        }
      }
    }
    return this.contentTypeModel.create(contentType);
  }

  async update(contentType: ContentTypeInput): Promise<ContentType> {
    await this.validateAndSanitizeInput(contentType, true);

    const { contentTypeId, ...dataToUpdate } = contentType;

    await this.contentTypeModel.updateOne(
      { contentTypeId: contentType.contentTypeId },
      { $set: dataToUpdate },
    );

    return this.contentTypeModel.findOne({ contentTypeId });
  }

  async delete(contentTypeId: string): Promise<ContentType> {
    return this.contentTypeModel.findOneAndDelete({ contentTypeId }).exec();
  }

  async validateAndSanitizeInput(input: ContentTypeInput, isUpdate = false) {
    const errors = [];

    // check if contentId is existing and unique
    if (!isUpdate) {
      if (!input.contentTypeId) {
        input.contentTypeId = randomUUID();
      } else {
        const existingContent = await this.findById(input.contentTypeId);

        if (existingContent) {
          errors.push('Type.contentTypeId.unique');
        }
      }
    }

    // check if contentId is a valid UUID
    if (!isUUID(input.contentTypeId, 'all')) {
      errors.push('content.contentId.invalid');
    }

    if (!minLength(input.name, 3)) {
      errors.push('contentType.name.required');
    }

    // check if name is unique globally, when no space is provided, or unique in the space
    if (!input.space) {
      const existingContentType = await this.contentTypeModel.findOne({
        contentTypeId: { $ne: input.contentTypeId },
        name: input.name,
      });

      if (existingContentType) {
        errors.push('contentType.name.unique');
      }
    } else {
      if (!isUUID(input.space, 'all')) {
        errors.push('contentType.space.invalid');
      } else {
        const existingContentType = await this.contentTypeModel.findOne({
          contentTypeId: { $ne: input.contentTypeId },
          name: input.name,
          space: input.space,
        });

        if (existingContentType) {
          errors.push('contentType.name.unique');
        }
      }
    }

    // check inputs of a block content type
    if (input.isBlockType) {
      if (input.hasSlug) {
        errors.push('contentType.hasSlug.invalid');
      }

      if (input.isPublishable) {
        errors.push('contentType.isPublishable.invalid');
      }

      if (input.canBeVisibleInMenu) {
        errors.push('contentType.canBeVisibleInMenu.invalid');
      }

      if (input.isVisibleInTree) {
        errors.push('contentType.isVisibleInTree.invalid');
      }
    }

    if (!input.fields) {
      input.fields = [];
    }

    // check content type fields input
    errors.push(...(await this.validateFieldTypesInput(input.fields)));

    if (errors.length > 0) {
      throw new Error(errors.join(','));
    }
  }

  async validateFieldTypesInput(fields: Array<ContentTypeFieldInput>) {
    const errors = [];

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      if (!field.name || !minLength(field.name, 1)) {
        errors.push(`contentType.fields[${i}].name.required`);
      } else {
        for (let j = 0; j < i; j++) {
          if (fields[j].name === field.name) {
            errors.push(`contentType.fields[${i}].name.unique`);
          }
        }
      }

      if (!field.type) {
        errors.push(`contentType.fields[${i}].type.required`);
      }

      if (
        [
          'StringFieldType',
          'NumberFieldType',
          'BooleanFieldType',
          'DateFieldType',
          'AssetRelationFieldType',
          'ContentRelationFieldType',
          'UserRelationFieldType',
          'BlockItemsFieldType',
          'BlockItemFieldType',
        ].indexOf(field.type) === -1
      ) {
        errors.push(`contentType.fields[${i}].type.invalid`);
      }

      switch (field.type) {
        case 'StringFieldType':
          if (!field.stringSettings) {
            errors.push(`contentType.fields[${i}].stringSettings.missing`);
          }
          break;
        case 'NumberFieldType':
          if (!field.numberSettings) {
            errors.push(`contentType.fields[${i}].numberSettings.missing`);
          }
          break;
        case 'BooleanFieldType':
          if (!field.booleanSettings) {
            errors.push(`contentType.fields[${i}].booleanSettings.missing`);
          }
          break;
        case 'DateFieldType':
          if (!field.dateSettings) {
            errors.push(`contentType.fields[${i}].dateSettings.missing`);
          }
          break;
        case 'AssetRelationFieldType':
          if (!field.assetSettings) {
            errors.push(`contentType.fields[${i}].assetSettings.missing`);
          }
          break;
        case 'ContentRelationFieldType':
          if (!field.contentSettings) {
            errors.push(`contentType.fields[${i}].contentSettings.missing`);
          }
          break;
        case 'UserRelationFieldType':
          if (!field.userSettings) {
            errors.push(`contentType.fields[${i}].userSettings.missing`);
          }
          break;
        case 'BlockItemsFieldType':
          if (!field.blocksSettings) {
            errors.push(`contentType.fields[${i}].blocksSettings.missing`);
          } else {
            if (!field.blocksSettings.possibleBlockTypes) {
              errors.push(
                `contentType.fields[${i}].blocksSettings.possibleBlockTypes.missing`,
              );
            } else {
              const possibleBlockTypes =
                field.blocksSettings.possibleBlockTypes;

              for (let j = 0; j < possibleBlockTypes.length; j++) {
                // TODO: check if block type exists
                if (!isUUID(possibleBlockTypes[j], 'all')) {
                  errors.push(
                    `contentType.fields[${i}].blocksSettings.possibleBlockTypes[${j}].invalid`,
                  );
                }
              }
            }
          }
          break;
        case 'BlockItemFieldType':
          if (!field.blockSettings) {
            errors.push(`contentType.fields[${i}].blockSettings.missing`);
          } else {
            if (!field.blockSettings.blockType) {
              errors.push(
                `contentType.fields[${i}].blockSettings.blockType.missing`,
              );
            } else {
              // TODO: check if block type exists
              if (!isUUID(field.blockSettings.blockType, 'all')) {
                errors.push(
                  `contentType.fields[${i}].blockSettings.blockType.invalid`,
                );
              }
            }
          }
          break;
      }
    }

    return errors;
  }
}
