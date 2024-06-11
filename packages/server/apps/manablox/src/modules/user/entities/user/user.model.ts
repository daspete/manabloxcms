import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({
  collection: 'users',
  toJSON: {
    virtuals: true,
  },
})
export class User {
  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  username: string;

  @Field()
  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
