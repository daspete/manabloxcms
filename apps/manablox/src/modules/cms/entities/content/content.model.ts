import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ContentFieldUnion } from '../content-field/content-field.model';

@ObjectType()
export class Content {
  @Field(() => ID)
  id: string;

  @Field(() => Content)
  parent: Content;

  @Field()
  locale: string;

  @Field(() => [ContentFieldUnion])
  fields: Array<typeof ContentFieldUnion>;
}
