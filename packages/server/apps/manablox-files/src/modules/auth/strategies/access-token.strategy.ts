import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPayload } from '../entities/jwt-payload.type';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('MANABLOX_SERVICE')
    private readonly manabloxServiceClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESSTOKEN_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return this.manabloxServiceClient.send('auth.user.findOne', {
      userId: payload.sub,
      email: payload.email,
    });
    // return this.userService.findOne({
    //   userId: payload.sub,
    //   email: payload.email,
    // });
  }
}
