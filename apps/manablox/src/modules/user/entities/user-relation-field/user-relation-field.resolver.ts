import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserRelationField } from '../../../cms/entities/content-field/content-field-types/relation-field/relation-field-types/user-relation-field/user-relation-field.model';
import { UserService } from '../../user.service';

@Resolver(() => UserRelationField)
export class UserRelationFieldResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField()
  async user(@Parent() parent: UserRelationField) {
    return this.userService.findOne(parent.user);
  }
}
