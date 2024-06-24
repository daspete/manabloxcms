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
export class DateFieldTypeSettings {
  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, required: false })
  minDate?: Date;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, required: false })
  maxDate?: Date;

  @Field(() => [Date], { nullable: true })
  @Prop({ type: [Date], required: false })
  excludedDates?: Array<Date>;

  @Field(() => [Date], { nullable: true })
  @Prop({ type: [Date], required: false })
  possibleDates?: Array<Date>;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, required: false })
  defaultValue?: Date;
}

export const DateFieldTypeSettingsSchema = SchemaFactory.createForClass(
  DateFieldTypeSettings,
);

@ObjectType()
@Schema()
export class DateFieldType {
  @Field()
  @Prop()
  fieldId: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'DateFieldType' = 'DateFieldType';

  @Field(() => ContentTypeFieldSettings)
  @Prop({ type: ContentTypeFieldSettingsSchema })
  fieldSettings: ContentTypeFieldSettings;

  @Field(() => ContentTypeFieldAdminSettings)
  @Prop({ type: ContentTypeFieldAdminSettingsSchema })
  adminSettings: ContentTypeFieldAdminSettings;

  @Field(() => DateFieldTypeSettings, { nullable: true })
  @Prop({ type: DateFieldTypeSettingsSchema })
  dateSettings: DateFieldTypeSettings;
}

export const DateFieldTypeSchema = SchemaFactory.createForClass(DateFieldType);
