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

  @Field({ nullable: true })
  @Prop({ required: false })
  gender: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  firstname: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  lastname: string;

  @Field()
  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
