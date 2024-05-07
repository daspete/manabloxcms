import { Module } from '@nestjs/common';
import { CmsResolver } from './cms.resolver';

import { MongooseModule } from '@nestjs/mongoose';
import { ContentSchema } from './entities/content/content.model';
import { ContentFieldSchema } from './entities/content-field/content-field.model';
import { CmsService } from './cms.service';

import { UserRelationFieldSchema } from './entities/content-field/content-field-types/relation-field/relation-field-types/user-relation-field/user-relation-field.model';
import { StringFieldSchema } from './entities/content-field/content-field-types/string-field/string-field.model';
import { NumberFieldSchema } from './entities/content-field/content-field-types/number-field/number-field.model';
import { BooleanFieldSchema } from './entities/content-field/content-field-types/boolean-field/boolean-field.model';
import {
  MultiRelationFieldSchema,
  RelationFieldSchema,
} from './entities/content-field/content-field-types/relation-field/relation-field.model';
import { RelationTypeSchema } from './entities/content-field/content-field-types/relation-field/relation-type/relation-type.model';
import { ContentRelationFieldSchema } from './entities/content-field/content-field-types/relation-field/relation-field-types/content-relation-field/content-relation-field.model';
import { AssetRelationFieldSchema } from './entities/content-field/content-field-types/relation-field/relation-field-types/asset-relation-field/asset-relation-field.model';
import { ContentRelationFieldResolver } from './entities/content-field/content-field-types/relation-field/relation-field-types/content-relation-field/content-relation-field.resolver';

@Module({
  imports: [
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
          { name: 'RelationField', schema: RelationFieldSchema },
          { name: 'MultiRelationField', schema: MultiRelationFieldSchema },
        ],
      },
      {
        name: 'RelationType',
        schema: RelationTypeSchema,
        discriminators: [
          { name: 'ContentRelationField', schema: ContentRelationFieldSchema },
          { name: 'UserRelationField', schema: UserRelationFieldSchema },
          { name: 'AssetRelationField', schema: AssetRelationFieldSchema },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [CmsService, CmsResolver, ContentRelationFieldResolver],
})
export class CmsModule {}
