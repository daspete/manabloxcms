import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from './content.model';
import { ContentInput } from './content.input';
import { ContentQueryInput } from './content-query.input';
import { PaginatedContents } from './paginated-contents.type';
import { isUUID, minLength } from 'class-validator';
import { ContentTypeService } from '../content-type/content-type.service';
import { ContentTree } from './content-tree.type';
import { PublishedContent } from './published-content.model';
import { randomUUID } from 'crypto';

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
    @InjectModel('PublishedContent')
    private readonly publishedContentModel: Model<PublishedContent>,
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

  async findPublishedContentById(contentId: string): Promise<Content> {
    const content = await this.publishedContentModel
      .findOne({ contentId: contentId })
      .exec();
    if (!content) return null;
    return content.toJSON();
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

  async findTreeItems(query: any): Promise<ContentTree[]> {
    let items = await this.contentModel.find(query).exec();
    items = items.map((item) => item.toJSON());

    const treeItems = await Promise.all(
      (items as Content[]).map(async (item) => {
        const children = await this.contentModel
          .find({ parent: item.contentId })
          .exec();

        return {
          content: item,
          children: children.map((child) => child.toJSON()),
        };
      }),
    );

    return treeItems;
  }

  async create(content: ContentInput): Promise<Content> {
    content = await this.validateAndSanitizeInput(content);

    const contentType = await this.contentTypeService.findById(content.type);
    if (contentType.hasSlug) {
      const permalink = await this.generatePermalinkToParent(content.parent);
      content.permalink = permalink
        ? `${permalink}/${content.slug}`
        : content.slug;
    }

    return this.contentModel.create(content);
  }

  async update(content: ContentInput): Promise<Content> {
    content = await this.validateAndSanitizeInput(content, true);
    const { contentId, ...dataToUpdate } = content;

    const contentType = await this.contentTypeService.findById(
      dataToUpdate.type,
    );
    if (contentType.hasSlug) {
      const permalink = await this.generatePermalinkToParent(
        dataToUpdate.parent,
      );
      dataToUpdate.permalink = permalink
        ? `${permalink}/${dataToUpdate.slug}`
        : dataToUpdate.slug;
    }

    await this.contentModel.updateOne({ contentId }, { $set: dataToUpdate });

    this.updateChildrenPermalinks(contentId, dataToUpdate.permalink);

    return this.findOne({ contentId });
  }

  async delete(contentId: string): Promise<Content> {
    // delete all children recursively
    const childContents = await this.find({ parent: contentId });
    await Promise.all(
      childContents.map(async (childContent) => {
        await this.delete(childContent.contentId);
      }),
    );

    this.deletePublished(contentId);

    return this.contentModel.findOneAndDelete({ contentId }).exec();
  }

  async deletePublished(contentId: string): Promise<Content> {
    // delete all children recursively
    const childContents = await this.find({ parent: contentId });
    await Promise.all(
      childContents.map(async (childContent) => {
        await this.deletePublished(childContent.contentId);
      }),
    );
    return this.publishedContentModel.findOneAndDelete({ contentId }).exec();
  }

  async publish(contentId: string): Promise<Content> {
    const content = await this.findById(contentId);

    if (!content) {
      throw new Error('content.notFound');
    }

    delete content['_id'];

    const existingPublishedContent = await this.publishedContentModel.findOne({
      contentId,
    });

    if (existingPublishedContent) {
      await this.publishedContentModel.updateOne(
        { contentId },
        { $set: content },
      );

      if (
        content.permalink &&
        content.permalink !== existingPublishedContent.permalink
      ) {
        await this.updatePublishedChildrenPermalinks(
          contentId,
          content.permalink,
        );
      }

      const publishedContent = await this.publishedContentModel.findOne({
        contentId,
      });

      return publishedContent.toJSON();
    } else {
      const publishedContent = await this.publishedContentModel.create(content);
      return publishedContent.toJSON();
    }
  }

  async generatePermalinkToParent(parentId: string | null) {
    if (!parentId) {
      return null;
    }

    const parent = await this.findById(parentId);
    if (!parent) {
      return null;
    }

    if (parent.permalink) {
      return parent.permalink;
    }

    return await this.generatePermalinkToParent(parent.parent);
  }

  async updateChildrenPermalinks(contentId: string, newPermalink: string) {
    const childContents = await this.find({ parent: contentId });

    await Promise.all(
      childContents.map(async (childContent) => {
        const childContentType = await this.contentTypeService.findById(
          childContent.type,
        );

        if (childContentType.hasSlug) {
          const _newPermalink = newPermalink
            ? `${newPermalink}/${childContent.slug}`
            : childContent.slug;

          await this.contentModel.updateOne(
            { contentId: childContent.contentId },
            { $set: { permalink: _newPermalink } },
          );
        }

        await this.updateChildrenPermalinks(
          childContent.contentId,
          newPermalink,
        );
      }),
    );
  }

  async updatePublishedChildrenPermalinks(
    contentId: string,
    newPermalink: string,
  ) {
    const childContents = await this.publishedContentModel.find({
      parent: contentId,
    });

    await Promise.all(
      childContents.map(async (childContent) => {
        const childContentType = await this.contentTypeService.findById(
          childContent.type,
        );

        if (childContentType.hasSlug) {
          const _newPermalink = newPermalink
            ? `${newPermalink}/${childContent.slug}`
            : childContent.slug;

          await this.publishedContentModel.updateOne(
            { contentId: childContent.contentId },
            { $set: { permalink: _newPermalink } },
          );
        }

        await this.updatePublishedChildrenPermalinks(
          childContent.contentId,
          newPermalink,
        );
      }),
    );
  }

  async validateAndSanitizeInput(input: ContentInput, isUpdate = false) {
    const errors = [];

    // check if contentId is existing and unique
    if (!isUpdate) {
      if (!input.contentId) {
        input.contentId = randomUUID();
      } else {
        const existingContent = await this.findById(input.contentId);

        if (existingContent) {
          errors.push('content.contentId.unique');
        }
      }
    }

    // check if contentId is a valid UUID
    if (!isUUID(input.contentId, 'all')) {
      errors.push('content.contentId.invalid');
    }

    // check if content type is existing and valid
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

    // check if localizationId is existing and valid
    if (!isUpdate) {
      if (!input.localizationId) {
        errors.push('content.localizationId.required');
      } else {
        if (!isUUID(input.localizationId, 'all')) {
          errors.push('content.localizationId.invalid');
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

    // check if parent is existing and valid
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

    return input;
  }
}
