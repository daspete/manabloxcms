import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({
  collection: 'users',
  timestamps: true,
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

  @Prop({ isRequired: false })
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
