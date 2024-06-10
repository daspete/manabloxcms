import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Content } from './content.model';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema({
  collection: 'published-contents',
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class PublishedContent extends Content {}

export const PublishedContentSchema =
  SchemaFactory.createForClass(PublishedContent);

export type PublishedContentDocument = HydratedDocument<PublishedContent>;
