import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    JwtModule.register({}),
    ClientsModule.register([
      {
        name: 'MANABLOX_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'manablox-server',
          port: 3001,
        },
      },
    ]),
  ],
  providers: [AccessTokenStrategy],
  exports: [],
})
export class AuthModule {}
