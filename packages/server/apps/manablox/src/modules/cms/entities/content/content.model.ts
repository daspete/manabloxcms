import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  ContentFieldSchema,
  ContentFieldUnion,
  contentFieldTypes,
} from '../content-field/content-field.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

type ContentFieldUnionType = (typeof contentFieldTypes)[number];
@ObjectType()
@Schema({
  collection: 'contents',
  toJSON: {
    virtuals: true,
  },
})
export class Content {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop()
  type: string;

  @Field(() => Content, { nullable: true })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    nullable: true,
  })
  parent: string;

  @Field()
  @Prop()
  locale: string;

  @Field(() => [ContentFieldUnion])
  @Prop({ type: [ContentFieldSchema] })
  fields: Array<ContentFieldUnionType>;
}

export const ContentSchema = SchemaFactory.createForClass(Content);

export type ContentDocument = HydratedDocument<Content>;