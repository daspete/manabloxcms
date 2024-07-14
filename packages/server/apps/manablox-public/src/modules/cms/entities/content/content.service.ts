import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from './content.model';
import { ContentQueryInput } from './content-query.input';
import { PaginatedContents } from './paginated-contents.type';
import { ContentTypeService } from '../content-type/content-type.service';

const buildElemMatchObject = (field) => {
  const elem = {
    name: field.name,
  };

  if (field.string) {
    elem['string'] = field.string;
  }
  if (field.number) {
    elem['number'] = field.number;
  }
  if (field.boolean) {
    elem['boolean'] = field.boolean;
  }
  if (field.date) {
    elem['date'] = field.date;
  }
  if (field.asset) {
    elem['asset'] = field.asset;
  }
  if (field.user) {
    elem['user'] = field.user;
  }
  if (field.content) {
    elem['content'] = field.content;
  }

  if (field.block) {
    elem['block.fields'] = {
      $elemMatch: {
        name: field.block.field.name,
        string: field.block.field.string,
      },
    };
  }

  return {
    fields: {
      $elemMatch: elem,
    },
  };
};

export const buildQueryObject = (query: Array<ContentQueryInput>) => {
  return query.map((q) => {
    const queryObject = [];

    if (q.title) {
      queryObject.push({ title: q.title });
    }

    if (q.slug) {
      queryObject.push({ slug: q.slug });
    }

    if (q.type) {
      queryObject.push({ type: q.type });
    }

    if (q.fields) {
      q.fields.map((field) => {
        queryObject.push(buildElemMatchObject(field));
      });
    }
    return { $and: queryObject };
  });
};

@Injectable()
export class ContentService {
  constructor(
    @InjectModel('Content') private readonly contentModel: Model<Content>,
    private readonly contentTypeService: ContentTypeService,
  ) {}

  async findAll(): Promise<Content[]> {
    const items = await this.contentModel.find().exec();
    return items.map((item) => item.toJSON());
  }

  async findPaginated(
    query: Array<ContentQueryInput> = [],
    limit: number = 10,
    page: number = 1,
  ): Promise<PaginatedContents> {
    const builtQuery = buildQueryObject(query);

    const queryObject = {};

    if (builtQuery.length > 0) {
      queryObject['$or'] = builtQuery;
    }

    const itemCount = await this.contentModel
      .countDocuments(queryObject)
      .exec();

    const items = await this.contentModel
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

  async find(query: any): Promise<Content[]> {
    return this.contentModel.find(query).lean();
  }

  async findOne(query: any): Promise<Content> {
    return this.contentModel.findOne(query).lean();
  }

  async findById(contentId: string): Promise<Content> {
    return this.contentModel.findOne({ contentId: contentId }).lean();
  }
}
