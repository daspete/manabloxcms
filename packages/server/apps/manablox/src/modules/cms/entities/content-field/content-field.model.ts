/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType, createUnionType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { StringField } from './content-field-types/string-field/string-field.model';
import { NumberField } from './content-field-types/number-field/number-field.model';
import { BooleanField } from './content-field-types/boolean-field/boolean-field.model';
import { DateField } from './content-field-types/date-field/date-field.model';
import { UserRelationField } from './content-field-types/user-relation-field/user-relation-field.model';
import { AssetRelationField } from './content-field-types/asset-relation-field/asset-relation-field.model';
import { ContentRelationField } from './content-field-types/content-relation-field/content-relation-field.model';
import { BlockItemField } from './content-field-types/block-item-field/block-item-field.model';
import { BlockItemsField } from './content-field-types/block-items-field/block-items-field.model';

@ObjectType()
@Schema({ discriminatorKey: 'type', _id: false, autoCreate: false })
export class ContentField {
  @Prop()
  @Field()
  type: string;
}

export const ContentFieldSchema = SchemaFactory.createForClass(ContentField);
export const contentFieldTypes = [
  StringField,
  NumberField,
  BooleanField,
  DateField,
  UserRelationField,
  AssetRelationField,
  ContentRelationField,
  BlockItemField,
  BlockItemsField,
];

export type ContentFieldUnionType = (typeof contentFieldTypes)[number];

export const ContentFieldUnion = createUnionType({
  name: 'ContentFieldUnion',
  types: () => contentFieldTypes,
  resolveType: (value: any) => {
    return value.type;
  },
});
