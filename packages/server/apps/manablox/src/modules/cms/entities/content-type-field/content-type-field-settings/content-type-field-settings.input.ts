import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ContentTypeFieldSettingsInput {
  @Field()
  isRequired: boolean;
}
