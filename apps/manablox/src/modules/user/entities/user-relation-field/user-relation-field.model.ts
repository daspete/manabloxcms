/* eslint-disable @typescript-eslint/prefer-as-const */
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@ObjectType()
@Schema()
export class UserRelationField {
  @Field()
  type: 'UserRelationField' = 'UserRelationField';

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;
}

export const UserRelationFieldSchema =
  SchemaFactory.createForClass(UserRelationField);
