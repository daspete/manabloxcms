import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Block, BlockSchema } from "../../../block/block.model";
import mongoose from "mongoose";

@ObjectType()
@Schema()
export class BlockItemsField {
  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  fieldId: string;

  @Field()
  type: 'BlockItemField' = 'BlockItemField';

  @Field(() => [Block])
  @Prop({ type: mongoose.Schema.Types.Array, ref: 'Block' })
  blocks: Array<Block>;
}

export const BlockItemsFieldSchema = SchemaFactory.createForClass(BlockItemsField);
