/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ContentTypeFieldSettings,
  ContentTypeFieldSettingsSchema,
} from '../../content-type-field-settings/content-type-field-settings.model';

@ObjectType()
@Schema()
export class AssetRelationFieldTypeSettings {
  @Field({ nullable: true })
  @Prop({ required: false })
  defaultValue?: boolean;
}

export const AssetRelationFieldTypeSettingsSchema =
  SchemaFactory.createForClass(AssetRelationFieldTypeSettings);

@ObjectType()
@Schema()
export class AssetRelationFieldType {
  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'AssetRelationFieldType' = 'AssetRelationFieldType';

  @Field(() => ContentTypeFieldSettings)
  @Prop({ type: ContentTypeFieldSettingsSchema })
  fieldSettings: ContentTypeFieldSettings;

  @Field(() => AssetRelationFieldTypeSettings)
  @Prop({ type: AssetRelationFieldTypeSettingsSchema })
  assetSettings: AssetRelationFieldTypeSettings;
}

export const AssetRelationFieldTypeSchema = SchemaFactory.createForClass(
  AssetRelationFieldType,
);
