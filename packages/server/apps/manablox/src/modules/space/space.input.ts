import { Field, InputType } from '@nestjs/graphql';
import { BlockInput } from '../cms/entities/block/block.input';

@InputType()
export class SpaceInput {
  @Field()
  spaceId: string;

  @Field()
  name: string;

  @Field()
  technicalName: string;

  @Field()
  description: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  settingsBlockType?: string;

  @Field(() => BlockInput, { nullable: true })
  settings?: BlockInput;
}
