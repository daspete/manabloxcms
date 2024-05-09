import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class ContentTypeFieldSettings {
  @Field()
  @Prop()
  isRequired: boolean;
}

export const ContentTypeFieldSettingsSchema = SchemaFactory.createForClass(
  ContentTypeFieldSettings,
);
