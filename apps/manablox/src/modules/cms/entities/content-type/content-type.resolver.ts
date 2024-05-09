import { Args, Query, Resolver } from '@nestjs/graphql';
import { ContentType } from './content-type.model';
import { ContentTypeService } from './content-type.service';

@Resolver(() => ContentType)
export class ContentTypeResolver {
  constructor(private readonly contentTypeService: ContentTypeService) {}

  @Query(() => [ContentType])
  async contentTypes() {
    return this.contentTypeService.findAll();
  }

  @Query(() => ContentType)
  async contentType(@Args('type', { type: () => String }) type: string) {
    return this.contentTypeService.findOne({ type });
  }
}
