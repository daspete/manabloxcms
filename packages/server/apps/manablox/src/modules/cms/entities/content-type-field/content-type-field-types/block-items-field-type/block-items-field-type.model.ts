import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContentType } from '../../../content-type/content-type.model';
import {
  ContentTypeFieldSettings,
  ContentTypeFieldSettingsSchema,
} from '../../content-type-field-settings/content-type-field-settings.model';
import {
  ContentTypeFieldAdminSettings,
  ContentTypeFieldAdminSettingsSchema,
} from '../../content-type-field-admin-settings/content-type-field-admin-settings.model';

@ObjectType()
@Schema()
export class BlockItemsFieldTypeSettings {
  @Field(() => [ContentType])
  @Prop({ type: [String] })
  possibleBlockTypes: Array<string>;
}

export const BlockItemsFieldTypeSettingsSchema = SchemaFactory.createForClass(
  BlockItemsFieldTypeSettings,
);

@ObjectType()
@Schema()
export class BlockItemsFieldType {
  @Field()
  @Prop()
  fieldId: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'BlockItemsFieldType' = 'BlockItemsFieldType';

  @Field(() => ContentTypeFieldSettings)
  @Prop({ type: ContentTypeFieldSettingsSchema })
  fieldSettings: ContentTypeFieldSettings;

  @Field(() => ContentTypeFieldAdminSettings)
  @Prop({ type: ContentTypeFieldAdminSettingsSchema })
  adminSettings: ContentTypeFieldAdminSettings;

  @Field(() => BlockItemsFieldTypeSettings, { nullable: true })
  @Prop({ type: BlockItemsFieldTypeSettingsSchema })
  blocksSettings: BlockItemsFieldTypeSettings;
}

export const BlockItemsFieldTypeSchema =
  SchemaFactory.createForClass(BlockItemsFieldType);
