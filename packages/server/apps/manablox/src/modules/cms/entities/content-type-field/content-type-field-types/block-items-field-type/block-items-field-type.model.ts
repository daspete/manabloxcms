import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { ContentType } from "../../../content-type/content-type.model";
import { ContentTypeFieldSettings, ContentTypeFieldSettingsSchema } from "../../content-type-field-settings/content-type-field-settings.model";

@ObjectType()
@Schema()
export class BlockItemsFieldTypeSettings {
  @Field(() => ContentType)
  @Prop({ type: Array<mongoose.Schema.Types.ObjectId>, ref: 'ContentType' })
  possibleBlockTypes: Array<string>;
}

export const BlockItemsFieldTypeSettingsSchema = SchemaFactory.createForClass(BlockItemsFieldTypeSettings);

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

  @Field(() => BlockItemsFieldTypeSettings, { nullable: true })
  @Prop({ type: BlockItemsFieldTypeSettingsSchema })
  blocksSettings: BlockItemsFieldTypeSettings;
}

export const BlockItemsFieldTypeSchema = SchemaFactory.createForClass(BlockItemsFieldType);
