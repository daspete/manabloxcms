import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserRelationFieldTypeSettingsInput {
  @Field({ nullable: true })
  defaultValue?: boolean;
}
