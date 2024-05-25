import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Block, BlockSchema } from "../../../block/block.model";

@ObjectType()
@Schema()
export class BlockItemField {
  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  fieldId: string;

  @Field()
  type: 'BlockItemField' = 'BlockItemField';

  @Field(() => Block)
  @Prop({ type: BlockSchema })
  block: Block;
}

export const BlockItemFieldSchema = SchemaFactory.createForClass(BlockItemField);
