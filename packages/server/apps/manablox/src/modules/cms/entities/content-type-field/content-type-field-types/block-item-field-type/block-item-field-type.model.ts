import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { ContentType } from "../../../content-type/content-type.model";
import { ContentTypeFieldSettings, ContentTypeFieldSettingsSchema } from "../../content-type-field-settings/content-type-field-settings.model";

@ObjectType()
@Schema()
export class BlockItemFieldTypeSettings {
  @Field(() => ContentType)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ContentType' })
  blockType: string;
}

export const BlockItemFieldTypeSettingsSchema = SchemaFactory.createForClass(BlockItemFieldTypeSettings);

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

  @Field(() => BlockItemFieldTypeSettings, { nullable: true })
  @Prop({ type: BlockItemFieldTypeSettingsSchema })
  blockSettings: BlockItemFieldTypeSettings;
}

export const BlockItemFieldTypeSchema = SchemaFactory.createForClass(BlockItemFieldType);
