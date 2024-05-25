import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AssetInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  url: string;
}
