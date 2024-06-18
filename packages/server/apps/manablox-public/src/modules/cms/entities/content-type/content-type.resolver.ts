import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ContentType } from './content-type.model';
import { ContentTypeService } from './content-type.service';
import { Space } from '../../../space/space.model';
import { SpaceService } from '../../../space/space.service';

@Resolver(() => ContentType)
export class ContentTypeResolver {
  constructor(
    private readonly contentTypeService: ContentTypeService,
    private readonly spaceService: SpaceService,
  ) {}

  @Query(() => [ContentType])
  async contentTypes() {
    return this.contentTypeService.findAll();
  }

  @Query(() => ContentType)
  async contentType(
    @Args('contentTypeId', { type: () => String }) contentTypeId: string,
  ) {
    return this.contentTypeService.findById(contentTypeId);
  }

  @ResolveField(() => [Space])
  async space(@Parent() contentType: ContentType) {
    return this.spaceService.findOne({ spaceId: contentType.space });
  }
}
