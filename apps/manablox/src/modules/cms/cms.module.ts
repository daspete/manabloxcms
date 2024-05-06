import { Module } from '@nestjs/common';
import { CmsResolver } from './cms.resolver';
import { ContentRelationFieldResolver } from './entities/content-relation-field/content-relation-field.resolver';
// import { UserRelationFieldResolver } from './entities/user-relation-field/user-relation-field.resolver';
// import { AssetRelationFieldResolver } from './entities/asset-relation-field/asset-relation-field.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSchema } from './entities/content/content.model';
import {
  BooleanFieldSchema,
  ContentFieldSchema,
  NumberFieldSchema,
  RelationFieldSchema,
  StringFieldSchema,
} from './entities/content-field/content-field.model';
import { CmsService } from './cms.service';
import { RelationTypeSchema } from './entities/relation-type/relation-type.model';
import { ContentRelationFieldSchema } from './entities/content-relation-field/content-relation-field.model';
import { UserRelationFieldSchema } from '../user/entities/user-relation-field/user-relation-field.model';

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
        ],
      },
      {
        name: 'RelationType',
        schema: RelationTypeSchema,
        discriminators: [
          { name: 'ContentRelationField', schema: ContentRelationFieldSchema },
          { name: 'UserRelationField', schema: UserRelationFieldSchema },
        ],
      },
      // {
      //   name: 'RelationField',
      //   schema: RelationFieldSchema,
      // },
      // {
      //   name: 'RelationType',
      //   schema: RelationTypeSchema,
      //   discriminators: [
      //     { name: 'ContentRelationField', schema: ContentRelationFieldSchema },
      //     // { name: 'UserRelationField', schema: UserSchema },
      //     // { name: 'AssetRelationField', schema: AssetSchema },
      //   ],
      // },
    ]),
  ],
  controllers: [],
  providers: [
    CmsService,
    CmsResolver,
    ContentRelationFieldResolver,
    // UserRelationFieldResolver,
    // AssetRelationFieldResolver,
  ],
})
export class CmsModule {}
