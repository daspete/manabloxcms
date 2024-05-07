/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Content } from '../../../../../content/content.model';
import mongoose from 'mongoose';

@ObjectType()
@Schema()
export class ContentRelationField {
  @Field()
  type: 'ContentRelationField' = 'ContentRelationField';

  @Field(() => Content)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Content' })
  content: string;
}

export const ContentRelationFieldSchema =
  SchemaFactory.createForClass(ContentRelationField);
