import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';
import { AssetModule } from '../asset/asset.module';

import { ContentService } from './entities/content/content.service';
import { ContentResolver } from './entities/content/content.resolver';

import { ContentSchema } from './entities/content/content.model';
import { ContentFieldSchema } from './entities/content-field/content-field.model';

import { BlockSchema } from './entities/block/block.model';
import { BlockFieldSchema } from './entities/block-field/block-field.model';

import { ContentTypeService } from './entities/content-type/content-type.service';
import { ContentTypeResolver } from './entities/content-type/content-type.resolver';
import { ContentTypeSchema } from './entities/content-type/content-type.model';
import { ContentTypeFieldSchema } from './entities/content-type-field/content-type-field.model';

import { StringFieldSchema } from './entities/content-field/content-field-types/string-field/string-field.model';
import { NumberFieldSchema } from './entities/content-field/content-field-types/number-field/number-field.model';
import { BooleanFieldSchema } from './entities/content-field/content-field-types/boolean-field/boolean-field.model';
import { DateFieldSchema } from './entities/content-field/content-field-types/date-field/date-field.model';
import { BlockItemFieldSchema } from './entities/content-field/content-field-types/block-item-field/block-item-field.model';
import { BlockItemsFieldSchema } from './entities/content-field/content-field-types/block-items-field/block-items-field.model';
import { UserRelationFieldSchema } from './entities/content-field/content-field-types/user-relation-field/user-relation-field.model';
import { AssetRelationFieldSchema } from './entities/content-field/content-field-types/asset-relation-field/asset-relation-field.model';
import { ContentRelationFieldSchema } from './entities/content-field/content-field-types/content-relation-field/content-relation-field.model';

import { AssetRelationFieldResolver } from './entities/content-field/content-field-types/asset-relation-field/asset-relation-field.resolver';
import { UserRelationFieldResolver } from './entities/content-field/content-field-types/user-relation-field/user-relation-field.resolver';
import { ContentRelationFieldResolver } from './entities/content-field/content-field-types/content-relation-field/content-relation-field.resolver';

import { StringFieldTypeSchema } from './entities/content-type-field/content-type-field-types/string-field-type/string-field-type.model';
import { NumberFieldTypeSchema } from './entities/content-type-field/content-type-field-types/number-field-type/number-field-type.model';
import { BooleanFieldTypeSchema } from './entities/content-type-field/content-type-field-types/boolean-field-type/boolean-field-type.model';
import { DateFieldTypeSchema } from './entities/content-type-field/content-type-field-types/date-field-type/date-field-type.model';
import { BlockItemFieldTypeSchema } from './entities/content-type-field/content-type-field-types/block-item-field-type/block-item-field-type.model';
import { BlockItemsFieldTypeSchema } from './entities/content-type-field/content-type-field-types/block-items-field-type/block-items-field-type.model';
import { UserRelationFieldTypeSchema } from './entities/content-type-field/content-type-field-types/user-relation-field-type/user-relation-field-type.model';
import { AssetRelationFieldTypeSchema } from './entities/content-type-field/content-type-field-types/asset-relation-field-type/asset-relation-field-type.model';
import { ContentRelationFieldTypeSchema } from './entities/content-type-field/content-type-field-types/content-relation-field-type/content-relation-field-type.model';

import { BlockItemFieldTypeSettingsResolver } from './entities/content-type-field/content-type-field-types/block-item-field-type/block-item-field-type-settings.resolver';
import { BlockItemsFieldTypeSettingsResolver } from './entities/content-type-field/content-type-field-types/block-items-field-type/block-items-field-type-settings.resolver';
import { UserRelationFieldTypeSettingsResolver } from './entities/content-type-field/content-type-field-types/user-relation-field-type/user-relation-field-type-settings.resolver';
import { AssetRelationFieldTypeSettingsResolver } from './entities/content-type-field/content-type-field-types/asset-relation-field-type/asset-relation-field-type-settings.resolver';
import { ContentRelationFieldTypeSettingsResolver } from './entities/content-type-field/content-type-field-types/content-relation-field-type/content-relation-field-type-settings.resolver';


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
          { name: 'BlockItemField', schema: BlockItemFieldSchema },
          { name: 'BlockItemsField', schema: BlockItemsFieldSchema },
        ],
      },
      {
        name: 'Block',
        schema: BlockSchema,
      },
      {
        name: 'BlockField',
        schema: BlockFieldSchema,
        discriminators: [
          { name: 'BlockStringField', schema: StringFieldSchema },
          { name: 'BlockNumberField', schema: NumberFieldSchema },
          { name: 'BlockBooleanField', schema: BooleanFieldSchema },
          { name: 'BlockDateField', schema: DateFieldSchema },
          { name: 'BlockUserRelationField', schema: UserRelationFieldSchema },
          { name: 'BlockAssetRelationField', schema: AssetRelationFieldSchema },
          { name: 'BlockContentRelationField', schema: ContentRelationFieldSchema },
          { name: 'SubBlockItemField', schema: BlockItemFieldSchema },
          { name: 'SubBlockItemsField', schema: BlockItemsFieldSchema },
        ],
      },
      {
        name: 'ContentType',
        schema: ContentTypeSchema,
      },
      {
        name: 'ContentTypeField',
        schema: ContentTypeFieldSchema,
        discriminators: [
          { name: 'StringFieldType', schema: StringFieldTypeSchema },
          { name: 'NumberFieldType', schema: NumberFieldTypeSchema },
          { name: 'BooleanFieldType', schema: BooleanFieldTypeSchema },
          { name: 'DateFieldType', schema: DateFieldTypeSchema },
          {
            name: 'UserRelationFieldType',
            schema: UserRelationFieldTypeSchema,
          },
          {
            name: 'AssetRelationFieldType',
            schema: AssetRelationFieldTypeSchema,
          },
          {
            name: 'ContentRelationFieldType',
            schema: ContentRelationFieldTypeSchema,
          },
          { name: 'BlockItemFieldType', schema: BlockItemFieldTypeSchema },
          { name: 'BlockItemsFieldType', schema: BlockItemsFieldTypeSchema },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [
    ContentService,
    ContentResolver,

    ContentRelationFieldResolver,
    AssetRelationFieldResolver,
    UserRelationFieldResolver,

    ContentTypeService,
    ContentTypeResolver,

    BlockItemFieldTypeSettingsResolver,
    BlockItemsFieldTypeSettingsResolver,
    UserRelationFieldTypeSettingsResolver,
    AssetRelationFieldTypeSettingsResolver,
    ContentRelationFieldTypeSettingsResolver,
  ],
})
export class CmsModule {}
