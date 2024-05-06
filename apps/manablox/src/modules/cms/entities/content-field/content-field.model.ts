/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType, createUnionType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContentRelationField } from '../content-relation-field/content-relation-field.model';
import {
  RelationTypeSchema,
  RelationTypeUnion,
} from '../relation-type/relation-type.model';

const relationFieldTypes = [ContentRelationField] as const;
type RelationUnionType = (typeof relationFieldTypes)[number];

@ObjectType()
@Schema()
export class StringField {
  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'StringField' = 'StringField';

  @Field()
  @Prop()
  string: string;
}

@ObjectType()
@Schema()
export class NumberField {
  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'NumberField' = 'NumberField';

  @Field()
  @Prop()
  number: number;
}

@ObjectType()
@Schema()
export class BooleanField {
  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'BooleanField' = 'BooleanField';

  @Field()
  @Prop()
  boolean: boolean;
}

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
@Schema({ discriminatorKey: 'type', _id: false, autoCreate: false })
export class ContentField {
  @Prop()
  @Field()
  type: string;
}

export const ContentFieldSchema = SchemaFactory.createForClass(ContentField);
export const StringFieldSchema = SchemaFactory.createForClass(StringField);
export const NumberFieldSchema = SchemaFactory.createForClass(NumberField);
export const BooleanFieldSchema = SchemaFactory.createForClass(BooleanField);

export const RelationFieldSchema = SchemaFactory.createForClass(RelationField);

export const ContentFieldUnion = createUnionType({
  name: 'ContentFieldUnion',
  types: () => [StringField, NumberField, BooleanField, RelationField],
  resolveType: (
    value: StringField | NumberField | BooleanField | RelationField,
  ) => {
    return value.type;
  },
});
