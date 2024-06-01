import { Field, ObjectType } from '@nestjs/graphql';
import { Space } from './space.model';

@ObjectType()
export class PaginatedSpaces {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  page: number;

  @Field(() => Number)
  limit: number;

  @Field(() => [Space])
  items: Space[];
}
