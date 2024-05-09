import { Field, InputType } from '@nestjs/graphql';
import { ContentFieldInput } from '../content-field/content-field.input';

@InputType()
export class ContentInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  parent?: string;

  @Field()
  locale: string;

  @Field(() => [ContentFieldInput], { nullable: true })
  fields: Array<ContentFieldInput>;
}
