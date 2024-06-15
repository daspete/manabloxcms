import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../entities/jwt-payload.type';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject('MANABLOX_SERVICE')
    private readonly manabloxServiceClient: ClientProxy,
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
    const user = await this.manabloxServiceClient.send('auth.user.findOne', {
      userId: payload.sub,
      email: payload.email,
    });
    return { user, refreshToken };
  }
}
