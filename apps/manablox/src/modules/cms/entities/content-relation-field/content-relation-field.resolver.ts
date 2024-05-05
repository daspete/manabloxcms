import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ContentRelationField } from './content-relation-field.model';

@Resolver(() => ContentRelationField)
export class ContentRelationFieldResolver {
  constructor() {
    console.log('ContentRelationFieldResolver');
  }

  @ResolveField()
  async content(@Parent() parent: ContentRelationField) {
    console.log(parent);
    return {
      id: '2',
      parent: null,
      locale: 'en',
      fields: [
        {
          name: 'title',
          type: 'string',
          string: 'Hello relation World resolved!',
        },
      ],
    };
  }
}
