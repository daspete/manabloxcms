import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AssetInput {
  @Field({ nullable: true })
  assetId?: string;

  @Field()
  disk: string;

  @Field()
  space: string;

  @Field()
  path: string;

  @Field()
  filename: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  size: number;

  @Field({ nullable: true })
  width?: number;

  @Field({ nullable: true })
  height?: number;

  @Field({ nullable: true })
  length?: number;
}
