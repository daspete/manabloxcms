import { Query, Resolver } from '@nestjs/graphql';
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
  async findContents() {
    return this.cmsService.find({
      $and: [
        {
          fields: {
            $elemMatch: {
              name: 'slug',
              string: 'home',
            },
          },
        },
        {
          fields: {
            $elemMatch: {
              name: 'title',
              string: {
                $regex: '^S',
              },
            },
          },
        },
      ],
    });
  }
}
