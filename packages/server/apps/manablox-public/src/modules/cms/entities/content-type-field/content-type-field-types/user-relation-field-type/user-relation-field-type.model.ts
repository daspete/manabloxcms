/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ContentTypeFieldSettings,
  ContentTypeFieldSettingsSchema,
} from '../../content-type-field-settings/content-type-field-settings.model';
import { User } from 'apps/manablox-public/src/modules/user/entities/user/user.model';

@ObjectType()
@Schema()
export class UserRelationFieldTypeSettings {
  @Field(() => User, { nullable: true })
  @Prop({ required: false })
  defaultValue?: string;
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

  @Field(() => UserRelationFieldTypeSettings, { nullable: true })
  @Prop({ type: UserRelationFieldTypeSettingsSchema })
  userSettings: UserRelationFieldTypeSettings;
}

export const UserRelationFieldTypeSchema = SchemaFactory.createForClass(
  UserRelationFieldType,
);
