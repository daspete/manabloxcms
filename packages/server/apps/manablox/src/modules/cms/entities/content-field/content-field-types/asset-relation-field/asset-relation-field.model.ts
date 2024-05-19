/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Asset } from 'apps/manablox/src/modules/asset/entities/asset/asset.model';
import mongoose from 'mongoose';

@ObjectType()
@Schema()
export class AssetRelationField {
  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  fieldId: string;

  @Field()
  type: 'AssetRelationField' = 'AssetRelationField';

  @Field(() => Asset, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: false })
  asset: string;
}

export const AssetRelationFieldSchema =
  SchemaFactory.createForClass(AssetRelationField);
