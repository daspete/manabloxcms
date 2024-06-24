import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class ContentTypeFieldAdminSettings {
  @Field({ nullable: true })
  @Prop({ required: false })
  zone?: string;

  @Field(() => Float, { nullable: true })
  @Prop({ required: false })
  width?: number;
}

export const ContentTypeFieldAdminSettingsSchema = SchemaFactory.createForClass(
  ContentTypeFieldAdminSettings,
);
