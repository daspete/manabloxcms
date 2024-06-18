/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class BooleanField {
  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  fieldId: string;

  @Field()
  type: 'BooleanField' = 'BooleanField';

  @Field()
  @Prop()
  boolean: boolean;
}

export const BooleanFieldSchema = SchemaFactory.createForClass(BooleanField);
