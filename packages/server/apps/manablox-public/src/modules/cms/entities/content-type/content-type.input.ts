import { Field, InputType } from '@nestjs/graphql';
import { ContentTypeFieldInput } from '../content-type-field/content-type-field.input';

@InputType()
export class ContentTypeInput {
  @Field({ nullable: true })
  contentTypeId?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  space?: string;

  @Field()
  isBlockType: boolean;

  @Field({ nullable: true })
  hasSlug?: boolean;

  @Field({ nullable: true })
  isPublishable?: boolean;

  @Field({ nullable: true })
  canBeVisibleInMenu?: boolean;

  @Field({ nullable: true })
  isVisibleInTree?: boolean;

  @Field({ nullable: true })
  icon?: string;

  @Field(() => [ContentTypeFieldInput], { nullable: true })
  fields: Array<ContentTypeFieldInput>;
}
