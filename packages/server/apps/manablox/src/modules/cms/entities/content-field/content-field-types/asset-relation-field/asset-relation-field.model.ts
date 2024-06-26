/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Asset } from 'apps/manablox/src/modules/asset/entities/asset/asset.model';

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
  @Prop({ required: false })
  asset?: string;
}

export const AssetRelationFieldSchema =
  SchemaFactory.createForClass(AssetRelationField);
