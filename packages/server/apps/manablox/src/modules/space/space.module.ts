import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceResolver } from './space.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceSchema } from './space.model';
import { CmsModule } from '../cms/cms.module';

@Module({
  imports: [
    CmsModule,
    MongooseModule.forFeature([
      {
        name: 'Space',
        schema: SpaceSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [SpaceService, SpaceResolver],
  exports: [SpaceService],
})
export class SpaceModule {}
