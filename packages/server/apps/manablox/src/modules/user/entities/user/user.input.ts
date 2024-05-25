import { Field, InputType } from "@nestjs/graphql";
import { Prop } from "@nestjs/mongoose";

@InputType()
export class UserInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  @Prop()
  username: string;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  password: string;
}
