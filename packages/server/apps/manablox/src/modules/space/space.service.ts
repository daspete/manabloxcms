import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Space } from './space.model';
import { SpaceInput } from './space.input';
import { SpaceQueryInput } from './space-query.input';
import { PaginatedSpaces } from './paginated-spaces.type';
import { isURL, isUUID, minLength } from 'class-validator';
import { ContentTypeService } from '../cms/entities/content-type/content-type.service';

export const buildQueryObject = (query: Array<SpaceQueryInput>) => {
  return query.map((q) => {
    const queryObject = [];

    if (q.name) {
      queryObject.push({ name: q.name });
    }

    if (q.technicalName) {
      queryObject.push({ technicalName: q.technicalName });
    }

    if (q.spaceId) {
      queryObject.push({ spaceId: q.spaceId });
    }

    return { $and: queryObject };
  });
};

@Injectable()
export class SpaceService {
  constructor(
    @InjectModel('Space') private readonly spaceModel: Model<Space>,
    private readonly contentTypeService: ContentTypeService,
  ) {}

  async findAll(): Promise<Space[]> {
    const items = await this.spaceModel.find().exec();
    return items.map((item) => item.toJSON());
  }

  async findPaginated(
    query: Array<SpaceQueryInput> = [],
    limit: number = 10,
    page: number = 1,
  ): Promise<PaginatedSpaces> {
    const builtQuery = buildQueryObject(query);

    const queryObject = {};

    if (builtQuery.length > 0) {
      queryObject['$or'] = builtQuery;
    }

    const itemCount = await this.spaceModel.countDocuments(queryObject).exec();

    const items = await this.spaceModel
      .find(queryObject)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();

    const mappedItems = items.map((item) => item.toJSON());

    return {
      total: itemCount,
      page,
      limit,
      items: mappedItems,
    };
  }

  async find(query: any): Promise<Array<Space>> {
    const spaces = await this.spaceModel.find(query).exec();
    return spaces.map((space) => space.toJSON());
  }

  async findOne(query: any): Promise<Space> {
    const space = await this.spaceModel.findOne(query).exec();
    if (!space) return null;
    return space.toJSON();
  }

  async findById(spaceId: string): Promise<Space> {
    const space = await this.spaceModel.findOne({ spaceId: spaceId }).exec();
    if (!space) return null;
    return space.toJSON();
  }

  async create(space: SpaceInput): Promise<Space> {
    await this.validateInput(space);
    return this.spaceModel.create(space);
  }

  async update(space: SpaceInput): Promise<Space> {
    await this.validateInput(space, true);
    const { spaceId, ...dataToUpdate } = space;

    await this.spaceModel.updateOne({ spaceId }, { $set: dataToUpdate });

    return this.findOne({ spaceId });
  }

  async delete(id: string): Promise<Space> {
    return this.spaceModel.findByIdAndDelete(id).exec();
  }

  async validateInput(input: SpaceInput, isUpdate = false) {
    const errors = [];

    if (!isUUID(input.spaceId, 'all')) {
      errors.push('space.spaceId.invalid');
    } else {
      if (!isUpdate) {
        const existingSpace = await this.spaceModel.findOne({
          spaceId: input.spaceId,
        });

        if (existingSpace) {
          errors.push('space.spaceId.unique');
        }
      }
    }

    if (!minLength(input.name, 3)) {
      errors.push('space.name.length');
    }

    if (!minLength(input.technicalName, 3)) {
      errors.push('space.technicalName.length');
    }

    const existingSpace = await this.spaceModel.findOne({
      spaceId: { $ne: input.spaceId },
      technicalName: input.technicalName,
    });

    if (existingSpace) {
      errors.push('space.technicalName.unique');
    }

    if (!isURL(input.url)) {
      errors.push('space.url.invalid');
    }

    if (input.settingsBlockType) {
      const existingContentType = await this.contentTypeService.findById(
        input.settingsBlockType,
      );

      if (!existingContentType) {
        errors.push('space.settingsBlockType.notFound');
      }

      // TODO: validate settings block fields with the content type input validator
    }

    if (errors.length > 0) {
      throw new Error(errors.join(','));
    }
  }
}
