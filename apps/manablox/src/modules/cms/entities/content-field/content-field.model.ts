/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType, createUnionType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { StringField } from './content-field-types/string-field/string-field.model';
import { NumberField } from './content-field-types/number-field/number-field.model';
import { BooleanField } from './content-field-types/boolean-field/boolean-field.model';
import {
  MultiRelationField,
  RelationField,
} from './content-field-types/relation-field/relation-field.model';

@ObjectType()
@Schema({ discriminatorKey: 'type', _id: false, autoCreate: false })
export class ContentField {
  @Prop()
  @Field()
  type: string;
}

export const ContentFieldSchema = SchemaFactory.createForClass(ContentField);

export const ContentFieldUnion = createUnionType({
  name: 'ContentFieldUnion',
  types: () => [
    StringField,
    NumberField,
    BooleanField,
    RelationField,
    MultiRelationField,
  ],
  resolveType: (
    value:
      | StringField
      | NumberField
      | BooleanField
      | RelationField
      | MultiRelationField,
  ) => {
    return value.type;
  },
});
