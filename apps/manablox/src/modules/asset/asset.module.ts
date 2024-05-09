import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetResolver } from './asset.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetSchema } from './entities/asset/asset.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Asset', schema: AssetSchema }]),
  ],
  controllers: [],
  providers: [AssetService, AssetResolver],
  exports: [AssetService],
})
export class AssetModule {}
