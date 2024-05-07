/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class NumberField {
  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'NumberField' = 'NumberField';

  @Field()
  @Prop()
  number: number;
}

export const NumberFieldSchema = SchemaFactory.createForClass(NumberField);
