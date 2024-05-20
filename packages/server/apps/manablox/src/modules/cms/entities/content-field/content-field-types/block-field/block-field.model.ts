import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Content } from "../../../content/content.model";
import mongoose from "mongoose";

@ObjectType()
@Schema()
export class BlockField {
  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  fieldId: string;

  @Field()
  type: 'BlockField' = 'BlockField';

  @Field(() => Content)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Content' })
  block: string;
}

export const BlockFieldSchema = SchemaFactory.createForClass(BlockField);
