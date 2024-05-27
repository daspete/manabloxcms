import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ContentFieldQueryInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  string?: string;

  @Field({ nullable: true })
  number?: number;

  @Field({ nullable: true })
  boolean?: boolean;

  @Field({ nullable: true })
  date?: Date;

  @Field(() => BlockQueryInput, { nullable: true })
  block?: any;

  @Field({ nullable: true })
  asset?: string;

  @Field({ nullable: true })
  user?: string;

  @Field({ nullable: true })
  content?: string;
}

@InputType()
export class BlockQueryInput {
  @Field(() => ContentFieldQueryInput, { nullable: true })
  field?: ContentFieldQueryInput;
}

@InputType()
export class ContentQueryInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => [ContentFieldQueryInput], { nullable: true })
  fields?: Array<ContentFieldQueryInput>;
}
