import { Field, ObjectType } from '@nestjs/graphql';
import { Content } from './content.model';

@ObjectType()
export class PaginatedContents {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  page: number;

  @Field(() => Number)
  limit: number;

  @Field(() => [Content])
  items: Content[];
}
