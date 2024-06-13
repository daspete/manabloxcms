import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;

  refreshToken?: string;
}
