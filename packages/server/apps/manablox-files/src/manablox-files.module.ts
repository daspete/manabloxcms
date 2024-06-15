import { Module } from '@nestjs/common';
import { ManabloxFilesController } from './manablox-files.controller';
import { ManabloxFilesService } from './manablox-files.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({ isGlobal: true }),
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
    AuthModule,
  ],
  controllers: [ManabloxFilesController],
  providers: [ManabloxFilesService],
})
export class ManabloxFilesModule {}
