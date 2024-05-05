import { Module } from '@nestjs/common';
import { CmsResolver } from './cms.resolver';
import { ContentRelationFieldResolver } from './entities/content-relation-field/content-relation-field.resolver';
import { UserRelationFieldResolver } from './entities/user-relation-field/user-relation-field.resolver';
import { AssetRelationFieldResolver } from './entities/asset-relation-field/asset-relation-field.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CmsResolver,
    ContentRelationFieldResolver,
    UserRelationFieldResolver,
    AssetRelationFieldResolver,
  ],
})
export class CmsModule {}
