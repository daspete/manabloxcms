/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContentRelationField } from './relation-field-types/content-relation-field/content-relation-field.model';
import { AssetRelationField } from './relation-field-types/asset-relation-field/asset-relation-field.model';
import { UserRelationField } from './relation-field-types/user-relation-field/user-relation-field.model';
import {
  RelationTypeSchema,
  RelationTypeUnion,
} from './relation-type/relation-type.model';

const relationFieldTypes = [
  ContentRelationField,
  AssetRelationField,
  UserRelationField,
] as const;
type RelationUnionType = (typeof relationFieldTypes)[number];

@ObjectType()
@Schema({ autoCreate: false })
export class RelationField {
  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'RelationField' = 'RelationField';

  @Field(() => RelationTypeUnion)
  @Prop({ type: RelationTypeSchema })
  relation: RelationUnionType;
}

@ObjectType()
@Schema({ autoCreate: false })
export class MultiRelationField {
  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'MultiRelationField' = 'MultiRelationField';

  @Field(() => [RelationTypeUnion])
  @Prop({ type: [RelationTypeSchema] })
  relations: Array<RelationUnionType>;
}

export const RelationFieldSchema = SchemaFactory.createForClass(RelationField);
export const MultiRelationFieldSchema =
  SchemaFactory.createForClass(MultiRelationField);
