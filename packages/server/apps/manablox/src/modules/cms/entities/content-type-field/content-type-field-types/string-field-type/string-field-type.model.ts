/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ContentTypeFieldSettings,
  ContentTypeFieldSettingsSchema,
} from '../../content-type-field-settings/content-type-field-settings.model';

@ObjectType()
@Schema()
export class StringFieldTypeSettings {
  @Field({ nullable: true })
  @Prop({ required: false })
  minCharacters?: number;

  @Field({ nullable: true })
  @Prop({ required: false })
  maxCharacters?: number;

  @Field({ nullable: true })
  @Prop({ required: false })
  defaultValue?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  regex?: string;
}

export const StringFieldTypeSettingsSchema = SchemaFactory.createForClass(
  StringFieldTypeSettings,
);

@ObjectType()
@Schema()
export class StringFieldType {
  @Field()
  @Prop()
  fieldId: string;
  
  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'StringFieldType' = 'StringFieldType';

  @Field(() => ContentTypeFieldSettings)
  @Prop({ type: ContentTypeFieldSettingsSchema })
  fieldSettings: ContentTypeFieldSettings;

  @Field(() => StringFieldTypeSettings, { nullable: true })
  @Prop({ type: StringFieldTypeSettingsSchema })
  stringSettings: StringFieldTypeSettings;
}

export const StringFieldTypeSchema =
  SchemaFactory.createForClass(StringFieldType);
