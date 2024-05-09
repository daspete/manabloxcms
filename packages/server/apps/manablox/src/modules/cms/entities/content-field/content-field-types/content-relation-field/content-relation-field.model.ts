/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Content } from '../../../content/content.model';

@ObjectType()
@Schema()
export class ContentRelationField {
  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'ContentRelationField' = 'ContentRelationField';

  @Field(() => Content)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Content' })
  content: string;
}

export const ContentRelationFieldSchema =
  SchemaFactory.createForClass(ContentRelationField);
