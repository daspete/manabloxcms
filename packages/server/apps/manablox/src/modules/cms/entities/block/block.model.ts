import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BlockFieldSchema, BlockFieldUnion, BlockFieldUnionType } from "../block-field/block-field.model";

@ObjectType()
@Schema()
export class Block {
    @Field()
    @Prop()
    blockId: string;

    @Field()
    @Prop()
    type: string;

    @Field(() => [BlockFieldUnion])
    @Prop({ type: [BlockFieldSchema] })
    fields: Array<BlockFieldUnionType>;
}

export const BlockSchema = SchemaFactory.createForClass(Block);

export type BlockDocument = HydratedDocument<Block>;