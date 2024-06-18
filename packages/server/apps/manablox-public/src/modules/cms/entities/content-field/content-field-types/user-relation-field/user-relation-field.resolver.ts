import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from 'apps/manablox-public/src/modules/user/user.service';
import { UserRelationField } from './user-relation-field.model';

@Resolver(() => UserRelationField)
export class UserRelationFieldResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField()
  async user(@Parent() parent: UserRelationField) {
    if (!parent.user) return null;
    return this.userService.findById(parent.user);
  }
}
