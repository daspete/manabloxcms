import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AssetModule } from './modules/asset/asset.module';
import { CmsModule } from './modules/cms/cms.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceModule } from './modules/space/space.module';
import { ConfigModule } from '@nestjs/config';

import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL || 'mongodb://mongodb:27017/manablox',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      plugins: [
        ApolloServerPluginCacheControl({ defaultMaxAge: 1 }),
        responseCachePlugin(),
      ],
    }),
    AssetModule,
    CmsModule,
    UserModule,
    AuthModule,
    SpaceModule,
  ],
  controllers: [],
  providers: [],
  exports: [CmsModule],
})
export class ManabloxPublicModule {}
