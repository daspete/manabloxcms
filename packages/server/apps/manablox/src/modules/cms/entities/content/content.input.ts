import { Field, InputType } from '@nestjs/graphql';
import { ContentFieldInput } from '../content-field/content-field.input';

@InputType()
export class ContentInput {
  @Field()
  contentId: string;

  @Field()
  type: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  parent?: string;

  @Field()
  locale: string;

  @Field({ nullable: true })
  localizationId?: string;

  @Field({ nullable: true })
  permalink?: string;

  @Field(() => [ContentFieldInput], { nullable: true })
  fields: Array<ContentFieldInput>;
}
