/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ContentTypeFieldSettings,
  ContentTypeFieldSettingsSchema,
} from '../../content-type-field-settings/content-type-field-settings.model';
import { Asset } from 'apps/manablox/src/modules/asset/entities/asset/asset.model';
import {
  ContentTypeFieldAdminSettings,
  ContentTypeFieldAdminSettingsSchema,
} from '../../content-type-field-admin-settings/content-type-field-admin-settings.model';

@ObjectType()
@Schema()
export class AssetRelationFieldTypeSettings {
  @Field(() => Asset, { nullable: true })
  @Prop({ required: false })
  defaultValue?: string;
}

export const AssetRelationFieldTypeSettingsSchema =
  SchemaFactory.createForClass(AssetRelationFieldTypeSettings);

@ObjectType()
@Schema()
export class AssetRelationFieldType {
  @Field()
  @Prop()
  fieldId: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'AssetRelationFieldType' = 'AssetRelationFieldType';

  @Field(() => ContentTypeFieldSettings)
  @Prop({ type: ContentTypeFieldSettingsSchema })
  fieldSettings: ContentTypeFieldSettings;

  @Field(() => ContentTypeFieldAdminSettings)
  @Prop({ type: ContentTypeFieldAdminSettingsSchema })
  adminSettings: ContentTypeFieldAdminSettings;

  @Field(() => AssetRelationFieldTypeSettings, { nullable: true })
  @Prop({ type: AssetRelationFieldTypeSettingsSchema })
  assetSettings: AssetRelationFieldTypeSettings;
}

export const AssetRelationFieldTypeSchema = SchemaFactory.createForClass(
  AssetRelationFieldType,
);
