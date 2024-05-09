import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StringFieldTypeSettingsInput {
  @Field({ nullable: true })
  minCharacters?: number;

  @Field({ nullable: true })
  maxCharacters?: number;

  @Field({ nullable: true })
  defaultValue?: string;

  @Field({ nullable: true })
  regex?: string;
}
