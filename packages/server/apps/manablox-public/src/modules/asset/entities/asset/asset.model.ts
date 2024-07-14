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
  @Prop()
  assetId: string;

  @Prop()
  disk: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  type: string;

  @Prop()
  path: string;

  @Prop()
  filename: string;

  @Prop()
  @Field()
  size: number;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  width?: number;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  height?: number;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  length?: number;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
