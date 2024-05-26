import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ContentType } from '../../../content-type/content-type.model';
import {
  ContentTypeFieldSettings,
  ContentTypeFieldSettingsSchema,
} from '../../content-type-field-settings/content-type-field-settings.model';

@ObjectType()
@Schema()
export class BlockFieldTypeSettings {
  @Field(() => ContentType)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ContentType' })
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

  @Field(() => BlockFieldTypeSettings, { nullable: true })
  @Prop({ type: BlockFieldTypeSettingsSchema })
  blockSettings: BlockFieldTypeSettings;
}

export const BlockFieldTypeSchema =
  SchemaFactory.createForClass(BlockFieldType);
