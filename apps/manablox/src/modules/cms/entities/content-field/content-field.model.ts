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
    DateField,
    UserRelationField,
    AssetRelationField,
    ContentRelationField,
  ],
  resolveType: (
    value:
      | StringField
      | NumberField
      | BooleanField
      | DateField
      | UserRelationField
      | AssetRelationField
      | ContentRelationField,
  ) => {
    return value.type;
  },
});
