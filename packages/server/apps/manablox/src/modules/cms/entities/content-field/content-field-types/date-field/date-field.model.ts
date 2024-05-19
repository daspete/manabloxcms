/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class DateField {
  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  fieldId: string;

  @Field()
  type: 'DateField' = 'DateField';

  @Field(() => Date)
  @Prop({ type: Date })
  date: Date;
}

export const DateFieldSchema = SchemaFactory.createForClass(DateField);
