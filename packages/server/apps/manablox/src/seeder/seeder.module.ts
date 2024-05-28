import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ManabloxModule } from '../manablox.module';

@Module({
  imports: [ManabloxModule],
  providers: [SeederService],
})
export class SeederModule {}
