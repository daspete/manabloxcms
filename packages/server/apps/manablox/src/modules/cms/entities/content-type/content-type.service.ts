import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContentType } from './content-type.model';
import { Model } from 'mongoose';
import { ContentTypeInput } from './content-type.input';

@Injectable()
export class ContentTypeService {
  constructor(
    @InjectModel('ContentType')
    private readonly contentTypeModel: Model<ContentType>,
  ) {}

  async findAll(): Promise<ContentType[]> {
    const items = await this.contentTypeModel.find().exec();
    return items.map((item) => item.toJSON());
  }

  async find(query: any): Promise<ContentType[]> {
    const items = await this.contentTypeModel.find(query).exec();
    return items.map((item) => item.toJSON());
  }

  async findOne(query: any): Promise<ContentType> {
    return (await this.contentTypeModel.findOne(query).exec()).toJSON();
  }

  async findById(contentTypeId: string): Promise<ContentType> {
    return (
      await this.contentTypeModel
        .findOne({ contentTypeId: contentTypeId })
        .exec()
    ).toJSON();
  }

  async create(contentType: ContentTypeInput): Promise<ContentType> {
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
}
