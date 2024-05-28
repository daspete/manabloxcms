import { Field, ObjectType } from '@nestjs/graphql';
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
  @Field()
  @Prop()
  contentTypeId: string;

  @Field()
  @Prop()
  isBlockType: boolean;

  @Field()
  @Prop({ unique: true })
  name: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  hasSlug?: boolean;

  @Field({ nullable: true })
  @Prop({ required: false })
  isPublishable?: boolean;

  @Field({ nullable: true })
  @Prop({ required: false })
  canBeVisibleInMenu?: boolean;

  @Field({ nullable: true })
  @Prop({ required: false })
  isVisibleInTree?: boolean;

  @Field(() => [ContentTypeFieldUnion])
  @Prop({ type: [ContentTypeFieldSchema] })
  fields: Array<ContentTypeFieldUnionType>;
}

export const ContentTypeSchema = SchemaFactory.createForClass(ContentType);

export type ContentFieldDocument = HydratedDocument<ContentType>;
