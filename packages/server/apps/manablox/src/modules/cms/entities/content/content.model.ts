import { Field, ObjectType } from '@nestjs/graphql';
import {
  ContentFieldSchema,
  ContentFieldUnion,
  ContentFieldUnionType,
} from '../content-field/content-field.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ContentType } from '../content-type/content-type.model';

@ObjectType()
@Schema({
  collection: 'contents',
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class Content {
  @Field()
  @Prop()
  contentId: string;

  @Field(() => ContentType)
  @Prop()
  type: string;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  slug: string;

  @Field(() => Content, { nullable: true })
  @Prop({ nullable: true })
  parent: string;

  @Field()
  @Prop()
  locale: string;

  @Field()
  @Prop()
  localizationId: string;

  @Field(() => [ContentFieldUnion])
  @Prop({ type: [ContentFieldSchema] })
  fields: Array<ContentFieldUnionType>;
}

export const ContentSchema = SchemaFactory.createForClass(Content);

export type ContentDocument = HydratedDocument<Content>;
