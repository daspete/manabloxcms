/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ContentTypeFieldSettings,
  ContentTypeFieldSettingsSchema,
} from '../../content-type-field-settings/content-type-field-settings.model';

@ObjectType()
@Schema()
export class UserRelationFieldTypeSettings {
  @Field({ nullable: true })
  @Prop({ required: false })
  defaultValue?: boolean;
}

export const UserRelationFieldTypeSettingsSchema = SchemaFactory.createForClass(
  UserRelationFieldTypeSettings,
);

@ObjectType()
@Schema()
export class UserRelationFieldType {
  @Field()
  @Prop()
  fieldId: string;
  
  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'UserRelationFieldType' = 'UserRelationFieldType';

  @Field(() => ContentTypeFieldSettings)
  @Prop({ type: ContentTypeFieldSettingsSchema })
  fieldSettings: ContentTypeFieldSettings;

  @Field(() => UserRelationFieldTypeSettings)
  @Prop({ type: UserRelationFieldTypeSettingsSchema })
  userSettings: UserRelationFieldTypeSettings;
}

export const UserRelationFieldTypeSchema = SchemaFactory.createForClass(
  UserRelationFieldType,
);
