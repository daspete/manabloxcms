import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ContentRelationField } from './content-relation-field.model';
import { ContentService } from '../../../content/content.service';

@Resolver(() => ContentRelationField)
export class ContentRelationFieldResolver {
  constructor(private readonly contentService: ContentService) {}

  @ResolveField()
  async content(@Parent() parent: ContentRelationField) {
    return this.contentService.findOne(parent.content);
  }
}
