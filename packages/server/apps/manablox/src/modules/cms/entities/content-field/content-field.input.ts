import { Field, Float, ID, InputType } from '@nestjs/graphql';
import mongoose from 'mongoose';

@InputType()
export class ContentFieldInput {
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
}
