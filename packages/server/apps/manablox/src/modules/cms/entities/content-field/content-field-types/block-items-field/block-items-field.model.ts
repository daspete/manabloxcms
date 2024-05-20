import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Block, BlockSchema } from "../../../block/block.model";

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
  @Prop({ type: [BlockSchema] })
  blocks: Array<Block>;
}

export const BlockItemsFieldSchema = SchemaFactory.createForClass(BlockItemsField);