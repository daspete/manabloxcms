import { Field, ObjectType, createUnionType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StringFieldType } from './content-type-field-types/string-field-type/string-field-type.model';
import { NumberFieldType } from './content-type-field-types/number-field-type/number-field-type.model';
import { DateFieldType } from './content-type-field-types/date-field-type/date-field-type.model';
import { BooleanFieldType } from './content-type-field-types/boolean-field-type/boolean-field-type.model';
import { UserRelationFieldType } from './content-type-field-types/user-relation-field-type/user-relation-field-type.model';
import { AssetRelationFieldType } from './content-type-field-types/asset-relation-field-type/asset-relation-field-type.model';
import { ContentRelationFieldType } from './content-type-field-types/content-relation-field-type/content-relation-field-type.model';
import { BlockItemFieldType } from './content-type-field-types/block-item-field-type/block-item-field-type.model';
import { BlockItemsFieldType } from './content-type-field-types/block-items-field-type/block-items-field-type.model';


@ObjectType()
@Schema({ discriminatorKey: 'type', _id: false, autoCreate: false })
export class ContentTypeField {
  @Field()
  @Prop()
  type: string;
}

export const ContentTypeFieldSchema =
  SchemaFactory.createForClass(ContentTypeField);
export const contentTypeFieldTypes = [
  StringFieldType,
  NumberFieldType,
  DateFieldType,
  BooleanFieldType,
  UserRelationFieldType,
  AssetRelationFieldType,
  ContentRelationFieldType,
  BlockItemFieldType,
  BlockItemsFieldType
];

export const ContentTypeFieldUnion = createUnionType({
  name: 'ContentTypeFieldUnion',
  types: () => contentTypeFieldTypes,
  resolveType: (value: any) => {
    return value.type;
  },
});
