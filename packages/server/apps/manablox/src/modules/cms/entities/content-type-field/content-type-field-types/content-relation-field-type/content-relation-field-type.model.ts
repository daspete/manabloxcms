/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ContentTypeFieldSettings,
  ContentTypeFieldSettingsSchema,
} from '../../content-type-field-settings/content-type-field-settings.model';

@ObjectType()
@Schema()
export class ContentRelationFieldTypeSettings {
  @Field({ nullable: true })
  @Prop({ required: false })
  defaultValue?: boolean;
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

  @Field(() => ContentRelationFieldTypeSettings, { nullable: true })
  @Prop({ type: ContentRelationFieldTypeSettingsSchema })
  contentSettings: ContentRelationFieldTypeSettings;
}

export const ContentRelationFieldTypeSchema = SchemaFactory.createForClass(
  ContentRelationFieldType,
);
