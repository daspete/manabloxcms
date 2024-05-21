import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class BlockItemsFieldTypeSettingsInput {
  @Field(() => [ID], { nullable: true })
  possibleBlockTypes: Array<string>;
}
