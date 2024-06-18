import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserRelationFieldTypeSettings } from './user-relation-field-type.model';
import { UserService } from 'apps/manablox-public/src/modules/user/user.service';
import { User } from 'apps/manablox-public/src/modules/user/entities/user/user.model';

@Resolver(() => UserRelationFieldTypeSettings)
export class UserRelationFieldTypeSettingsResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => User, { nullable: true })
  async defaultValue(@Parent() parent: UserRelationFieldTypeSettings) {
    if (!parent.defaultValue) return null;
    return this.userService.findById(parent.defaultValue);
  }
}
