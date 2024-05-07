import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Content } from './entities/content/content.model';
import { CmsService } from './cms.service';

@Resolver(() => Content)
export class CmsResolver {
  constructor(private readonly cmsService: CmsService) {}

  @Query(() => [Content])
  async contents() {
    return this.cmsService.findAll();
  }

  @Query(() => [Content])
  async findContents(
    @Args('types', { type: () => [String], nullable: true })
    types: string[] = [],
  ) {
    const query = {};

    if (types.length > 0) {
      query['type'] = {
        $in: types,
      };
    }

    return this.cmsService.find(query);
    // return this.cmsService.find({
    //   $and: [
    //     {
    //       fields: {
    //         $elemMatch: {
    //           name: 'slug',
    //           string: 'home',
    //         },
    //       },
    //     },
    //     {
    //       fields: {
    //         $elemMatch: {
    //           name: 'title',
    //           string: {
    //             $regex: '^S',
    //           },
    //         },
    //       },
    //     },
    //   ],
    // });
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
}
