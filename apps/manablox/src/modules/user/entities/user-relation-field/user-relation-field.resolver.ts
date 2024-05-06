import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserRelationField } from './user-relation-field.model';
import { UserService } from '../../user.service';

@Resolver(() => UserRelationField)
export class UserRelationFieldResolver {
  constructor(private readonly userService: UserService) {
    console.log('UserRelationFieldResolver');
  }

  @ResolveField()
  async user(@Parent() parent: UserRelationField) {
    return this.userService.findOne(parent.user);
  }
}
