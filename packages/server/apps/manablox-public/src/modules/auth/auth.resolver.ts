import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthTokens } from './entities/authtokens.type';
import { LoginInput } from './entities/login.input';
// import { UserInput } from '../user/entities/user/user.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../guards/access-token.guard';
import { RefreshTokenGuard } from '../../guards/refresh-token.guard';
import { RequestUser } from '../../decorators/request-user.decorator';
import { User } from '../user/entities/user/user.model';
import { RefreshUser } from './entities/refresh-user.type';
import { RefreshTokenUser } from '../../decorators/refresh-token-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthTokens)
  async signIn(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.signIn(loginInput);
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => Boolean)
  async logout(@RequestUser() user: User) {
    return this.authService.logout(user.userId);
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => User)
  async me(@RequestUser() user: User) {
    return user;
  }

  // @Mutation(() => AuthTokens)
  // async signUp(@Args('user') user: UserInput) {
  //   return this.authService.signUp(user);
  // }

  @UseGuards(RefreshTokenGuard)
  @Mutation(() => AuthTokens)
  async refreshTokens(@RefreshTokenUser() refreshTokenUser: RefreshUser) {
    if (!refreshTokenUser.user) {
      throw new UnauthorizedException();
    }
    return this.authService.refreshTokens(
      refreshTokenUser.user.userId,
      refreshTokenUser.refreshToken,
    );
  }
}
