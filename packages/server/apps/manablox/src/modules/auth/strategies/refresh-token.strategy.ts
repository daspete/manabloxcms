import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../entities/jwt-payload.type';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('refreshtoken'),
      secretOrKey: configService.get<string>('JWT_REFRESHTOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.headers['refreshtoken'];
    const user = await this.userService.findOne({
      userId: payload.sub,
      email: payload.email,
    });
    return { user, refreshToken };
  }
}
