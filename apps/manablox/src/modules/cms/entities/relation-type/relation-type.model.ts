import { Field, ObjectType, createUnionType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContentRelationField } from '../content-relation-field/content-relation-field.model';
import { UserRelationField } from '../../../user/entities/user-relation-field/user-relation-field.model';
import { AssetRelationField } from '../../../asset/entities/asset-relation-field/asset-relation-field.model';

@ObjectType()
@Schema({ discriminatorKey: 'type', _id: false, autoCreate: false })
export class RelationType {
  @Prop()
  @Field()
  type: string;
}

export const RelationTypeSchema = SchemaFactory.createForClass(RelationType);

export const RelationTypeUnion = createUnionType({
  name: 'RelationTypeUnion',
  types: () => [ContentRelationField, UserRelationField, AssetRelationField],
  resolveType: (
    value: ContentRelationField | UserRelationField | AssetRelationField,
  ) => {
    return value.type;
  },
});
