import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ContentTypeField,
  ContentTypeFieldSchema,
} from '../content-type-field/content-type-field.model';

@ObjectType()
@Schema({
  collection: 'content-types',
  toJSON: {
    virtuals: true,
  },
})
export class ContentType {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  isPublishable: boolean;

  @Field(() => [ContentTypeField])
  @Prop({ type: [ContentTypeFieldSchema] })
  fields: Array<ContentTypeField>;
}

export const ContentTypeSchema = SchemaFactory.createForClass(ContentType);
