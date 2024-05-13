import { Field, InputType } from '@nestjs/graphql';
import { ContentTypeFieldInput } from '../content-type-field/content-type-field.input';

@InputType()
export class ContentTypeInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  contentTypeId: string;

  @Field()
  name: string;

  @Field()
  isPublishable: boolean;

  @Field(() => [ContentTypeFieldInput], { nullable: true })
  fields: Array<ContentTypeFieldInput>;
}
