import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from './content.model';
import { ContentInput } from './content.input';
import { ContentQueryInput } from './content-query.input';
import { PaginatedContents } from './paginated-contents.type';
import { isUUID, minLength } from 'class-validator';
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
    const items = await this.contentModel.find(query).exec();
    return items.map((item) => item.toJSON());
  }

  async findOne(query: any): Promise<Content> {
    const content = await this.contentModel.findOne(query).exec();
    if (!content) return null;
    return content.toJSON();
  }

  async findById(contentId: string): Promise<Content> {
    const content = await this.contentModel
      .findOne({ contentId: contentId })
      .exec();
    if (!content) return null;
    return content.toJSON();
  }

  async create(content: ContentInput): Promise<Content> {
    await this.validateInput(content);
    return this.contentModel.create(content);
  }

  async update(content: ContentInput): Promise<Content> {
    await this.validateInput(content, true);
    const { contentId, ...dataToUpdate } = content;

    await this.contentModel.updateOne({ contentId }, { $set: dataToUpdate });

    return this.findOne({ contentId });
  }

  async delete(contentId: string): Promise<Content> {
    return this.contentModel.findOneAndDelete({ contentId }).exec();
  }

  async validateInput(input: ContentInput, isUpdate = false) {
    const errors = [];

    if (!isUUID(input.contentId, 'all')) {
      errors.push('content.contentId.invalid');
    } else {
      if (!isUpdate) {
        const existingContent = await this.findById(input.contentId);

        if (existingContent) {
          errors.push('content.contentId.unique');
        }
      }
    }

    if (!input.type) {
      errors.push('content.type.required');
    } else {
      if (!isUUID(input.type, 'all')) {
        errors.push('content.type.invalid');
      } else {
        const existingContentType = await this.contentTypeService.findById(
          input.type,
        );

        if (!existingContentType) {
          errors.push('content.type.notFound');
        }
      }
    }

    if (!minLength(input.title, 1)) {
      errors.push('content.title.required');
    }

    if (!minLength(input.slug, 1)) {
      errors.push('content.slug.required');
    } else {
      const existingContent = await this.findOne({
        contentId: { $ne: input.contentId },
        parent: input.parent,
        slug: input.slug,
      });

      if (existingContent) {
        errors.push('content.slug.unique');
      }
    }

    if (input.parent) {
      if (!isUUID(input.parent, 'all')) {
        errors.push('content.parent.invalid');
      } else {
        const existingContent = await this.findById(input.parent);

        if (!existingContent) {
          errors.push('content.parent.notFound');
        }
      }
    }

    if (!minLength(input.locale, 1)) {
      errors.push('content.locale.required');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }
}
