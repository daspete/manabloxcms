import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AssetModule } from './modules/asset/asset.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { CmsModule } from './modules/cms/cms.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    AssetModule,
    CommunicationModule,
    CmsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class ManabloxModule {}
