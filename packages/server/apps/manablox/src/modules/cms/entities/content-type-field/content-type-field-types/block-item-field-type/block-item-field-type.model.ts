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
export class BlockItemFieldTypeSettings {
  @Field(() => ContentType)
  @Prop()
  blockType: string;
}

export const BlockItemFieldTypeSettingsSchema = SchemaFactory.createForClass(
  BlockItemFieldTypeSettings,
);

@ObjectType()
@Schema()
export class BlockItemFieldType {
  @Field()
  @Prop()
  fieldId: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'BlockItemFieldType' = 'BlockItemFieldType';

  @Field(() => ContentTypeFieldSettings)
  @Prop({ type: ContentTypeFieldSettingsSchema })
  fieldSettings: ContentTypeFieldSettings;

  @Field(() => ContentTypeFieldAdminSettings)
  @Prop({ type: ContentTypeFieldAdminSettingsSchema })
  adminSettings: ContentTypeFieldAdminSettings;

  @Field(() => BlockItemFieldTypeSettings, { nullable: true })
  @Prop({ type: BlockItemFieldTypeSettingsSchema })
  blockSettings: BlockItemFieldTypeSettings;
}

export const BlockItemFieldTypeSchema =
  SchemaFactory.createForClass(BlockItemFieldType);
