import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BooleanFieldTypeSettingsInput {
  @Field({ nullable: true })
  defaultValue?: boolean;
}
