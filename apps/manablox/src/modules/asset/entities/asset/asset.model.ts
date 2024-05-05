import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Asset {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  url: string;
}
