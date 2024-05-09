import { Module } from '@nestjs/common';
import { CmsResolver } from './cms.resolver';

import { MongooseModule } from '@nestjs/mongoose';

import { CmsService } from './cms.service';

import { UserModule } from '../user/user.module';
import { AssetModule } from '../asset/asset.module';

import { ContentSchema } from './entities/content/content.model';
import { ContentFieldSchema } from './entities/content-field/content-field.model';

import { StringFieldSchema } from './entities/content-field/content-field-types/string-field/string-field.model';
import { NumberFieldSchema } from './entities/content-field/content-field-types/number-field/number-field.model';
import { BooleanFieldSchema } from './entities/content-field/content-field-types/boolean-field/boolean-field.model';
import { DateFieldSchema } from './entities/content-field/content-field-types/date-field/date-field.model';
import { UserRelationFieldSchema } from './entities/content-field/content-field-types/user-relation-field/user-relation-field.model';
import { AssetRelationFieldSchema } from './entities/content-field/content-field-types/asset-relation-field/asset-relation-field.model';
import { ContentRelationFieldSchema } from './entities/content-field/content-field-types/content-relation-field/content-relation-field.model';

import { AssetRelationFieldResolver } from './entities/content-field/content-field-types/asset-relation-field/asset-relation-field.resolver';
import { UserRelationFieldResolver } from './entities/content-field/content-field-types/user-relation-field/user-relation-field.resolver';
import { ContentRelationFieldResolver } from './entities/content-field/content-field-types/content-relation-field/content-relation-field.resolver';

@Module({
  imports: [
    UserModule,
    AssetModule,
    MongooseModule.forFeature([
      {
        name: 'Content',
        schema: ContentSchema,
      },
      {
        name: 'ContentField',
        schema: ContentFieldSchema,
        discriminators: [
          { name: 'StringField', schema: StringFieldSchema },
          { name: 'NumberField', schema: NumberFieldSchema },
          { name: 'BooleanField', schema: BooleanFieldSchema },
          { name: 'DateField', schema: DateFieldSchema },
          { name: 'UserRelationField', schema: UserRelationFieldSchema },
          { name: 'AssetRelationField', schema: AssetRelationFieldSchema },
          { name: 'ContentRelationField', schema: ContentRelationFieldSchema },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [
    CmsService,
    CmsResolver,
    ContentRelationFieldResolver,
    AssetRelationFieldResolver,
    UserRelationFieldResolver,
  ],
})
export class CmsModule {}
