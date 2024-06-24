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
export class NumberFieldTypeSettings {
  @Field({ nullable: true })
  @Prop({ required: false })
  min?: number;

  @Field({ nullable: true })
  @Prop({ required: false })
  max?: number;

  @Field({ nullable: true })
  @Prop({ required: false })
  precision?: number;

  @Field({ nullable: true })
  @Prop({ required: false })
  defaultValue?: number;
}

export const NumberFieldTypeSettingsSchema = SchemaFactory.createForClass(
  NumberFieldTypeSettings,
);

@ObjectType()
@Schema()
export class NumberFieldType {
  @Field()
  @Prop()
  fieldId: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'NumberFieldType' = 'NumberFieldType';

  @Field(() => ContentTypeFieldSettings)
  @Prop({ type: ContentTypeFieldSettingsSchema })
  fieldSettings: ContentTypeFieldSettings;

  @Field(() => ContentTypeFieldAdminSettings)
  @Prop({ type: ContentTypeFieldAdminSettingsSchema })
  adminSettings: ContentTypeFieldAdminSettings;

  @Field(() => NumberFieldTypeSettings, { nullable: true })
  @Prop({ type: NumberFieldTypeSettingsSchema })
  numberSettings: NumberFieldTypeSettings;
}

export const NumberFieldTypeSchema =
  SchemaFactory.createForClass(NumberFieldType);
