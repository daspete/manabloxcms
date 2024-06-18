import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Content } from './content.model';
import { ContentService } from './content.service';
import { ContentQueryInput } from './content-query.input';
import { PaginatedContents } from './paginated-contents.type';
import { ContentType } from '../content-type/content-type.model';
import { ContentTypeService } from '../content-type/content-type.service';

@Resolver(() => Content)
export class ContentResolver {
  constructor(
    private readonly contentService: ContentService,
    private readonly contentTypeService: ContentTypeService,
  ) {}

  @Query(() => PaginatedContents)
  async contents(
    @Args('query', {
      type: () => [ContentQueryInput],
      nullable: true,
    })
    query: ContentQueryInput[] = [],
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit = 10,
    @Args('page', { type: () => Int, defaultValue: 1 }) page = 1,
  ) {
    return this.contentService.findPaginated(query, limit, page);
  }

  @Query(() => Content)
  async content(@Args('contentId', { type: () => String }) contentId: string) {
    return this.contentService.findOne({ contentId });
  }

  @Query(() => Content, { nullable: true })
  async contentByPermalink(
    @Args('permalink', { type: () => String }) permalink: string,
  ) {
    return this.contentService.findOne({ permalink });
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
    return this.contentService.findOne({ contentId: content.parent });
  }

  @ResolveField(() => ContentType)
  async type(@Parent() content: Content) {
    return this.contentTypeService.findById(content.type);
  }
}
