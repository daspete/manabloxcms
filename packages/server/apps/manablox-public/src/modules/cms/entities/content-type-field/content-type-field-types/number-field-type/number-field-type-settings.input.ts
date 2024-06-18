import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NumberFieldTypeSettingsInput {
  @Field({ nullable: true })
  min?: number;

  @Field({ nullable: true })
  max?: number;

  @Field({ nullable: true })
  precision?: number;

  @Field({ nullable: true })
  defaultValue?: number;
}
