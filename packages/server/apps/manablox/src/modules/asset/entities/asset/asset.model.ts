import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({
  collection: 'assets',
  toJSON: {
    virtuals: true,
  },
})
export class Asset {
  @Field()
  id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  type: string;

  @Field()
  @Prop()
  url: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);