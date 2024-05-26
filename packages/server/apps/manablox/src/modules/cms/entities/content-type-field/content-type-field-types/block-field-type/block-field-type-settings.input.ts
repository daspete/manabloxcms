import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BlockFieldTypeSettingsInput {
  @Field(() => ID, { nullable: true })
  blockType: string;
}
