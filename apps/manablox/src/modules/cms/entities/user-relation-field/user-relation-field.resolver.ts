import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserRelationField } from './user-relation-field.model';

@Resolver(() => UserRelationField)
export class UserRelationFieldResolver {
  constructor() {
    console.log('UserRelationFieldResolver');
  }

  @ResolveField()
  async user(@Parent() parent: UserRelationField) {
    console.log(parent);
    return {
      id: '1',
      username: 'admin',
      email: 'daspetemail@gmail.com',
    };
  }
}
