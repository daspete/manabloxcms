import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Content } from './content.model';

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
