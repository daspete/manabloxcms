import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { BlockInput } from '../block/block.input';

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
  user?: string;

  @Field(() => ID, { nullable: true })
  asset?: string;

  @Field(() => ID, { nullable: true })
  content?: string;

  @Field(() => BlockInput, { nullable: true })
  block?: BlockInput;

  @Field(() => [BlockInput], { nullable: true })
  blocks?: Array<BlockInput>;
}
