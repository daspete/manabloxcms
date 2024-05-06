import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetResolver } from './asset.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetSchema } from './entities/asset/asset.model';
import { AssetRelationFieldResolver } from './entities/asset-relation-field/asset-relation-field.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Asset', schema: AssetSchema }]),
  ],
  controllers: [],
  providers: [AssetService, AssetResolver, AssetRelationFieldResolver],
})
export class AssetModule {}
