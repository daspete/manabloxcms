/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ContentTypeFieldSettings,
  ContentTypeFieldSettingsSchema,
} from '../../content-type-field-settings/content-type-field-settings.model';
import {
  ContentTypeFieldAdminSettings,
  ContentTypeFieldAdminSettingsSchema,
} from '../../content-type-field-admin-settings/content-type-field-admin-settings.model';

@ObjectType()
@Schema()
export class BooleanFieldTypeSettings {
  @Field({ nullable: true })
  @Prop({ required: false })
  defaultValue?: boolean;
}

export const BooleanFieldTypeSettingsSchema = SchemaFactory.createForClass(
  BooleanFieldTypeSettings,
);

@ObjectType()
@Schema()
export class BooleanFieldType {
  @Field()
  @Prop()
  fieldId: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'BooleanFieldType' = 'BooleanFieldType';

  @Field(() => ContentTypeFieldSettings)
  @Prop({ type: ContentTypeFieldSettingsSchema })
  fieldSettings: ContentTypeFieldSettings;

  @Field(() => ContentTypeFieldAdminSettings)
  @Prop({ type: ContentTypeFieldAdminSettingsSchema })
  adminSettings: ContentTypeFieldAdminSettings;

  @Field(() => BooleanFieldTypeSettings, { nullable: true })
  @Prop({ type: BooleanFieldTypeSettingsSchema })
  booleanSettings: BooleanFieldTypeSettings;
}

export const BooleanFieldTypeSchema =
  SchemaFactory.createForClass(BooleanFieldType);
