import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetResolver } from './asset.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetSchema } from './entities/asset/asset.model';
import { HttpModule } from '@nestjs/axios';
import { AssetController } from './asset.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Asset', schema: AssetSchema }]),
  ],
  controllers: [AssetController],
  providers: [AssetService, AssetResolver],
  exports: [AssetService],
})
export class AssetModule {}
