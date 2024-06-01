import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Space } from './space.model';
import { SpaceService } from './space.service';
import { SpaceInput } from './space.input';
import { PaginatedSpaces } from './paginated-spaces.type';
import { SpaceQueryInput } from './space-query.input';
import { ContentTypeService } from '../cms/entities/content-type/content-type.service';

@Resolver(() => Space)
export class SpaceResolver {
  constructor(
    private readonly spaceService: SpaceService,
    private readonly contentTypeService: ContentTypeService,
  ) {}

  @Query(() => PaginatedSpaces)
  async spaces(
    @Args('query', {
      type: () => [SpaceQueryInput],
      defaultValue: [],
      nullable: true,
    })
    query: SpaceQueryInput[] = [],
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit = 10,
    @Args('page', { type: () => Int, defaultValue: 1 }) page = 1,
  ) {
    return this.spaceService.find(query, limit, page);
  }

  @Query(() => Space)
  async space(@Args('spaceId', { type: () => String }) spaceId: string) {
    return this.spaceService.findOne({ spaceId });
  }

  @Mutation(() => Space)
  async createSpace(@Args('space') space: SpaceInput): Promise<Space> {
    return this.spaceService.create(space);
  }

  @Mutation(() => Space)
  async updateSpace(@Args('space') space: SpaceInput) {
    return this.spaceService.update(space);
  }

  @ResolveField()
  async settingsBlockType(@Parent() space: Space) {
    return this.contentTypeService.findById(space.settingsBlockType);
  }
}
