import { Field, Float, ID, InputType } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { BlockInput } from '../block/block.input';

@InputType()
export class BlockFieldInput {
  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  fieldId: string;

  @Field({ nullable: true })
  string?: string;

  @Field(() => Float, { nullable: true })
  number?: number;

  @Field({ nullable: true })
  boolean?: boolean;

  @Field({ nullable: true })
  date?: Date;

  @Field(() => ID, { nullable: true })
  user?: mongoose.Types.ObjectId;

  @Field(() => ID, { nullable: true })
  asset?: mongoose.Types.ObjectId;

  @Field(() => ID, { nullable: true })
  content?: mongoose.Types.ObjectId;

  @Field(() => BlockInput, { nullable: true })
  block?: BlockInput;

  @Field(() => [BlockInput], { nullable: true })
  blocks?: Array<BlockInput>;
}
