import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user/user.model';
import { UserService } from './user.service';
import { UserInput } from './entities/user/user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('user') user: UserInput ): Promise<User> {
    return this.userService.create(user);
  }
}
