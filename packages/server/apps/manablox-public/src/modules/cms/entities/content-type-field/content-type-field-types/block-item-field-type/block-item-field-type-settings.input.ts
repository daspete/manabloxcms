import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BlockItemFieldTypeSettingsInput {
  @Field(() => ID, { nullable: true })
  blockType: string;
}
