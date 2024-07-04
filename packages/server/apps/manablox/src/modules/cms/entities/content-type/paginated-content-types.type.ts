import { Field, ObjectType } from '@nestjs/graphql';
import { ContentType } from './content-type.model';

@ObjectType()
export class PaginatedContentTypes {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  page: number;

  @Field(() => Number)
  limit: number;

  @Field(() => [ContentType])
  items: ContentType[];
}
