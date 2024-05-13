/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ContentTypeFieldSettings,
  ContentTypeFieldSettingsSchema,
} from '../../content-type-field-settings/content-type-field-settings.model';

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

  @Field(() => BooleanFieldTypeSettings, { nullable: true })
  @Prop({ type: BooleanFieldTypeSettingsSchema })
  booleanSettings: BooleanFieldTypeSettings;
}

export const BooleanFieldTypeSchema =
  SchemaFactory.createForClass(BooleanFieldType);
