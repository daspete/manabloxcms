import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ContentRelationField } from './content-relation-field.model';
import { CmsService } from '../../../../cms.service';

@Resolver(() => ContentRelationField)
export class ContentRelationFieldResolver {
  constructor(private readonly cmsService: CmsService) {
    console.log('ContentRelationFieldResolver');
  }

  @ResolveField()
  async content(@Parent() parent: ContentRelationField) {
    return this.cmsService.findOne(parent.content);
  }
}
