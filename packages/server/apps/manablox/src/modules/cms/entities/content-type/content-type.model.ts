import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import {
  ContentTypeFieldSchema,
  ContentTypeFieldUnion,
  contentTypeFieldTypes,
} from '../content-type-field/content-type-field.model';

type ContentTypeFieldUnionType = (typeof contentTypeFieldTypes)[number];

@ObjectType()
@Schema({
  collection: 'content-types',
  toJSON: {
    virtuals: true,
  },
})
export class ContentType {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop()
  contentTypeId: string;

  @Field()
  @Prop({ unique: true })
  name: string;

  @Field()
  @Prop()
  isPublishable: boolean;

  @Field()
  @Prop()
  canBeVisibleInMenu: boolean;

  @Field()
  @Prop()
  isVisibleInTree: boolean;

  @Field(() => [ContentTypeFieldUnion])
  @Prop({ type: [ContentTypeFieldSchema] })
  fields: Array<ContentTypeFieldUnionType>;
}

export const ContentTypeSchema = SchemaFactory.createForClass(ContentType);

export type ContentFieldDocument = HydratedDocument<ContentType>;
