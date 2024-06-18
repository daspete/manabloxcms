import { Field, ObjectType } from '@nestjs/graphql';
import { Content } from './content.model';

@ObjectType()
export class ContentTree {
  @Field(() => Content)
  content: Content;

  @Field(() => [Content])
  children: Array<Content>;
}
