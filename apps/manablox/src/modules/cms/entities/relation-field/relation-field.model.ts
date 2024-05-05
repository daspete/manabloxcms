import { createUnionType } from '@nestjs/graphql';
import { ContentRelationField } from '../content-relation-field/content-relation-field.model';
import { UserRelationField } from '../user-relation-field/user-relation-field.model';
import { AssetRelationField } from '../asset-relation-field/asset-relation-field.model';

export const RelationFieldUnion = createUnionType({
  name: 'RelationFieldUnion',
  types: () => [ContentRelationField, UserRelationField, AssetRelationField],
  resolveType: (
    value: ContentRelationField | UserRelationField | AssetRelationField,
  ) => {
    switch (value.type) {
      case 'contentrelation':
        return ContentRelationField;
      case 'userrelation':
        return UserRelationField;
      case 'assetrelation':
        return AssetRelationField;
      default:
        return null;
    }
  },
});
