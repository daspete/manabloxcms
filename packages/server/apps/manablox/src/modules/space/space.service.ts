import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Space } from './space.model';
import { SpaceInput } from './space.input';
import { SpaceQueryInput } from './space-query.input';
import { PaginatedSpaces } from './paginated-spaces.type';

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
    return this.spaceModel.create(space);
  }

  async update(space: SpaceInput): Promise<Space> {
    const { spaceId, ...dataToUpdate } = space;

    await this.spaceModel.updateOne({ spaceId }, { $set: dataToUpdate });

    return this.findOne({ spaceId });
  }

  async delete(id: string): Promise<Space> {
    return this.spaceModel.findByIdAndDelete(id).exec();
  }
}
