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
export class BlockFieldTypeSettings {
  @Field(() => ContentType)
  @Prop()
  blockType: string;
}

export const BlockFieldTypeSettingsSchema = SchemaFactory.createForClass(
  BlockFieldTypeSettings,
);

@ObjectType()
@Schema()
export class BlockFieldType {
  @Field()
  @Prop()
  fieldId: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  type: 'BlockFieldType' = 'BlockFieldType';

  @Field(() => ContentTypeFieldSettings)
  @Prop({ type: ContentTypeFieldSettingsSchema })
  fieldSettings: ContentTypeFieldSettings;

  @Field(() => ContentTypeFieldAdminSettings)
  @Prop({ type: ContentTypeFieldAdminSettingsSchema })
  adminSettings: ContentTypeFieldAdminSettings;

  @Field(() => BlockFieldTypeSettings, { nullable: true })
  @Prop({ type: BlockFieldTypeSettingsSchema })
  blockSettings: BlockFieldTypeSettings;
}

export const BlockFieldTypeSchema =
  SchemaFactory.createForClass(BlockFieldType);
