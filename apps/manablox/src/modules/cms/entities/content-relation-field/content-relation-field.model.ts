import { Field, ObjectType } from '@nestjs/graphql';
import { Content } from '../content/content.model';

@ObjectType()
export class ContentRelationField {
  @Field()
  type: 'contentrelation';

  @Field(() => Content)
  content: Content;
}
