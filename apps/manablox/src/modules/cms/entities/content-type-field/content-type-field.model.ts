import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ _id: false, autoCreate: false })
export class ContentTypeField {
  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  type: string;
}

export const ContentTypeFieldSchema =
  SchemaFactory.createForClass(ContentTypeField);
