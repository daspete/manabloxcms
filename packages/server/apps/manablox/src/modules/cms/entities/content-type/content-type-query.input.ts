import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ContentTypeQueryInput {
  @Field({ nullable: true })
  space: string;

  @Field({ nullable: true })
  isBlockType: boolean;

  @Field({ nullable: true })
  name: string;
}
