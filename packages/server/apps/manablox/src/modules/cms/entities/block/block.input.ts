import { Field, InputType } from '@nestjs/graphql';
import { BlockFieldInput } from '../block-field/block-field.input';

@InputType()
export class BlockInput {
  @Field()
  blockId: string;

  @Field()
  type: string;

  @Field(() => [BlockFieldInput], { nullable: true })
  fields: Array<BlockFieldInput>;
}
