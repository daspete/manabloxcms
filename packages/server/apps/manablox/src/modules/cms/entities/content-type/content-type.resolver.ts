import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContentType } from './content-type.model';
import { ContentTypeService } from './content-type.service';
import { ContentTypeInput } from './content-type.input';

@Resolver(() => ContentType)
export class ContentTypeResolver {
  constructor(private readonly contentTypeService: ContentTypeService) {}

  @Query(() => [ContentType])
  async contentTypes() {
    return this.contentTypeService.findAll();
  }

  @Query(() => ContentType)
  async contentType(@Args('name', { type: () => String }) name: string) {
    return this.contentTypeService.findOne({ name });
  }

  @Mutation(() => ContentType)
  async createContentType(@Args('contentType') contentType: ContentTypeInput) {
    return this.contentTypeService.create(contentType);
  }

  @Mutation(() => ContentType)
  async updateContentType(@Args('contentType') contentType: ContentTypeInput) {
    return this.contentTypeService.update(contentType);
  }
}
