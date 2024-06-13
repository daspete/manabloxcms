import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AssetModule } from './modules/asset/asset.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { CmsModule } from './modules/cms/cms.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceModule } from './modules/space/space.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL || 'mongodb://mongodb:27017/manablox',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    AssetModule,
    CommunicationModule,
    CmsModule,
    UserModule,
    AuthModule,
    SpaceModule,
  ],
  controllers: [],
  providers: [],
  exports: [CmsModule],
})
export class ManabloxModule {}
