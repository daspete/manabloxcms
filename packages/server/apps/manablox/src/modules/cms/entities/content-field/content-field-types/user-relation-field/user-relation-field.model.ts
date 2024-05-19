/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'apps/manablox/src/modules/user/entities/user/user.model';
import mongoose from 'mongoose';

@ObjectType()
@Schema()
export class UserRelationField {
  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  fieldId: string;

  @Field()
  type: 'UserRelationField' = 'UserRelationField';

  @Field(() => User, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  user: string;
}

export const UserRelationFieldSchema =
  SchemaFactory.createForClass(UserRelationField);
