import { ResolveField, Resolver } from '@nestjs/graphql';
import { AssetRelationField } from './asset-relation-field.model';

@Resolver(() => AssetRelationField)
export class AssetRelationFieldResolver {
  constructor() {
    console.log('AssetRelationFieldResolver');
  }

  @ResolveField()
  async asset() {
    return {
      id: '1',
      name: 'My Image',
      type: 'image',
      url: 'https://example.com/image.jpg',
    };
  }
}
