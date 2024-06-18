import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  BlockFieldUnion,
  BlockFieldUnionType,
} from '../block-field/block-field.model';

@ObjectType()
@Schema({ _id: false, autoCreate: false })
export class Block {
  @Field()
  @Prop()
  blockId: string;

  @Field()
  @Prop()
  type: string;

  @Field(() => [BlockFieldUnion])
  @Prop({ type: mongoose.Schema.Types.Array, ref: 'BlockField' })
  fields: Array<BlockFieldUnionType>;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
