import { Query, Resolver } from '@nestjs/graphql';
import { Content } from './entities/content/content.model';
import { CmsService } from './cms.service';

@Resolver(() => Content)
export class CmsResolver {
  constructor(private readonly cmsService: CmsService) {
    console.log('CmsResolver');
  }

  @Query(() => [Content])
  async contents() {
    return this.cmsService.findAll();
  }
}
