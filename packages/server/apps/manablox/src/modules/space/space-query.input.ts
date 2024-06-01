import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SpaceQueryInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  technicalName?: string;

  @Field({ nullable: true })
  spaceId: string;
}
