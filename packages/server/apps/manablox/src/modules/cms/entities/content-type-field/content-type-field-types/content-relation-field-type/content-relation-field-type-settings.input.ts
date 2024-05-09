import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ContentRelationFieldTypeSettingsInput {
  @Field({ nullable: true })
  defaultValue?: boolean;
}
