import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../user/entities/user/user.model';

@ObjectType()
export class UserRelationField {
  @Field()
  type: 'userrelation';

  @Field(() => User)
  user: User;
}
