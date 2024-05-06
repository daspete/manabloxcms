/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Asset } from '../asset/asset.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@ObjectType()
@Schema()
export class AssetRelationField {
  @Field()
  type: 'AssetRelationField' = 'AssetRelationField';

  @Field(() => Asset)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' })
  asset: string;
}

export const AssetRelationFieldSchema =
  SchemaFactory.createForClass(AssetRelationField);
