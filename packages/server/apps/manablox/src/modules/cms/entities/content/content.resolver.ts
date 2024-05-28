import {
  Args,
  Field,
  Int,
  Mutation,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import mongoose from 'mongoose';
import { Content } from './content.model';
import { ContentService } from './content.service';
import { ContentInput } from './content.input';
import { ContentQueryInput } from './content-query.input';

@ObjectType()
export class PaginatedContents {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  page: number;

  @Field(() => Number)
  limit: number;

  @Field(() => [Content])
  items: Content[];
}

@Resolver(() => Content)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Query(() => PaginatedContents)
  async contents(
    @Args('query', {
      type: () => [ContentQueryInput],
      defaultValue: [],
      nullable: true,
    })
    @Args('query', { type: () => [ContentQueryInput], nullable: true })
    query: ContentQueryInput[] = [],
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit = 10,
    @Args('page', { type: () => Int, defaultValue: 1 }) page = 1,
  ) {
    return this.contentService.find(query, limit, page);
  }

  @Query(() => Content)
  async content(@Args('contentId', { type: () => String }) contentId: string) {
    return this.contentService.findOne({ contentId });
  }

  @Mutation(() => Content)
  async createContent(@Args('content') content: ContentInput) {
    if (content.fields.length > 0) {
      for (let i = 0; i < content.fields.length; i++) {
        const field = content.fields[i];
        switch (field.type) {
          case 'AssetRelationField':
            field.asset = new mongoose.Types.ObjectId(`${field.asset}`);
            break;
          case 'UserRelationField':
            field.user = new mongoose.Types.ObjectId(`${field.user}`);
            break;
          case 'ContentRelationField':
            field.content = new mongoose.Types.ObjectId(`${field.content}`);
            break;
          default:
            break;
        }
      }
    }

    return this.contentService.create(content);
  }

  @Mutation(() => Content)
  async updateContent(@Args('content') content: ContentInput) {
    return this.contentService.update(content);
  }

  @Mutation(() => Content)
  async deleteContent(@Args('contentId') contentId: string) {
    return this.contentService.delete(contentId);
  }

  @ResolveField()
  async fields(
    @Args('fields', { type: () => [String], nullable: true })
    fields: string[] = [],
    @Parent() content: Content,
  ) {
    if (fields.length === 0) {
      return content.fields;
    }

    return content.fields.filter((field) => fields.includes(field.name));
  }

  @ResolveField()
  async parent(@Parent() content: Content) {
    if (!content.parent) return null;
    return this.contentService.findOne({ id: content.parent });
  }
}
