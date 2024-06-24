import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class ContentTypeFieldAdminSettingsInput {
  @Field({ nullable: true })
  zone?: string;

  @Field(() => Float, { nullable: true })
  width?: number;
}
