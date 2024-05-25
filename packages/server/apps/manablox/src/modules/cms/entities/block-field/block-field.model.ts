import { Field, ObjectType, createUnionType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { StringField } from "../content-field/content-field-types/string-field/string-field.model";
import { NumberField } from "../content-field/content-field-types/number-field/number-field.model";
import { BooleanField } from "../content-field/content-field-types/boolean-field/boolean-field.model";
import { DateField } from "../content-field/content-field-types/date-field/date-field.model";
import { UserRelationField } from "../content-field/content-field-types/user-relation-field/user-relation-field.model";
import { AssetRelationField } from "../content-field/content-field-types/asset-relation-field/asset-relation-field.model";
import { ContentRelationField } from "../content-field/content-field-types/content-relation-field/content-relation-field.model";
import { BlockItemField } from "../content-field/content-field-types/block-item-field/block-item-field.model";
import { BlockItemsField } from "../content-field/content-field-types/block-items-field/block-items-field.model";

@ObjectType()
@Schema({ discriminatorKey: 'type', _id: false, autoCreate: false })
export class BlockField {
    @Prop()
    @Field()
    type: string;
}

export const BlockFieldSchema = SchemaFactory.createForClass(BlockField);
export const blockFieldTypes = [
    StringField,
    NumberField,
    BooleanField,
    DateField,
    UserRelationField,
    AssetRelationField,
    ContentRelationField,
    BlockItemField,
    BlockItemsField
];

export type BlockFieldUnionType = (typeof blockFieldTypes)[number];

export const BlockFieldUnion = createUnionType({
    name: 'BlockFieldUnion',
    types: () => [
      StringField,
      NumberField,
      BooleanField,
      DateField,
      UserRelationField,
      AssetRelationField,
      ContentRelationField,
      BlockItemField,
      BlockItemsField
    ],
    resolveType: (value: any) => {
      return value.type;
    }
});
