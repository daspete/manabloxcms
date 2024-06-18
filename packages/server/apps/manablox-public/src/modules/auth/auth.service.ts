import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserInput } from '../user/entities/user/user.input';
import { compare, hash } from 'bcrypt';
import { LoginInput } from './entities/login.input';
import { AuthTokens } from './entities/authtokens.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(userInput: UserInput) {
    userInput.userId = crypto.randomUUID();
    const user = await this.userService.create(userInput);
    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return tokens;
  }

  async signIn(loginInput: LoginInput): Promise<AuthTokens> {
    const user = await this.userService.findOne({ email: loginInput.email });
    if (!user) {
      throw new Error('auth.user.notFound');
    }

    const isPasswordValid = await compare(loginInput.password, user.password);

    if (!isPasswordValid) {
      throw new Error('auth.password.invalid');
    }

    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    // TODO: if we want to have multiple devices, we should only delete the refresh token of the current device
    await this.userService.updateRefreshToken(userId, null);
    return true;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findOne({ userId });
    if (!user || !user.refreshToken) {
      throw new Error('auth.user.notFound');
    }

    const isRefreshTokenValid = await compare(refreshToken, user.refreshToken);
    if (!isRefreshTokenValid) {
      throw new Error('auth.refreshToken.invalid');
    }

    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return tokens;
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          expiresIn: '15m',
          secret: this.configService.get<string>('JWT_ACCESSTOKEN_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          expiresIn: '7d',
          secret: this.configService.get<string>('JWT_REFRESHTOKEN_SECRET'),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
