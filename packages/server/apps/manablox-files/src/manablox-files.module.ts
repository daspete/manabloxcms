import { Module } from '@nestjs/common';
import { ManabloxFilesController } from './manablox-files.controller';
import { ManabloxFilesService } from './manablox-files.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
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
  ],
  controllers: [ManabloxFilesController],
  providers: [ManabloxFilesService],
})
export class ManabloxFilesModule {}
