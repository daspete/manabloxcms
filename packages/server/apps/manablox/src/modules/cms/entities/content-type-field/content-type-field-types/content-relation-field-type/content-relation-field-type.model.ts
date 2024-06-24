/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ContentTypeFieldSettings,
  ContentTypeFieldSettingsSchema,
} from '../../content-type-field-settings/content-type-field-settings.model';
import { Content } from '../../../content/content.model';
import {
  ContentTypeFieldAdminSettings,
  ContentTypeFieldAdminSettingsSchema,
} from '../../content-type-field-admin-settings/content-type-field-admin-settings.model';

@ObjectType()
@Schema()
export class ContentRelationFieldTypeSettings {
  @Field(() => Content, { nullable: true })
  @Prop({ required: false })
  defaultValue?: string;
}

export const ContentRelationFieldTypeSettingsSchema =
  SchemaFactory.createForClass(ContentRelationFieldTypeSettings);

@ObjectType()
@Schema()
export class ContentRelationFieldType {
  @Field()
  @Prop()
  fieldId: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'ContentRelationFieldType' = 'ContentRelationFieldType';

  @Field(() => ContentTypeFieldSettings)
  @Prop({ type: ContentTypeFieldSettingsSchema })
  fieldSettings: ContentTypeFieldSettings;

  @Field(() => ContentTypeFieldAdminSettings)
  @Prop({ type: ContentTypeFieldAdminSettingsSchema })
  adminSettings: ContentTypeFieldAdminSettings;

  @Field(() => ContentRelationFieldTypeSettings, { nullable: true })
  @Prop({ type: ContentRelationFieldTypeSettingsSchema })
  contentSettings: ContentRelationFieldTypeSettings;
}

export const ContentRelationFieldTypeSchema = SchemaFactory.createForClass(
  ContentRelationFieldType,
);
