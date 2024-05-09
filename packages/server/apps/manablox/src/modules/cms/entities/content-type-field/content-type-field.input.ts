import { Field, InputType } from '@nestjs/graphql';
import { ContentTypeFieldSettingsInput } from './content-type-field-settings/content-type-field-settings.input';
import { NumberFieldTypeSettingsInput } from './content-type-field-types/number-field-type/number-field-type-settings.input';
import { StringFieldTypeSettingsInput } from './content-type-field-types/string-field-type/string-field-type-settings.input';
import { BooleanFieldTypeSettingsInput } from './content-type-field-types/boolean-field-type/boolean-field-type-settings.input';
import { DateFieldTypeSettingsInput } from './content-type-field-types/date-field-type/date-field-type-settings.input';
import { UserRelationFieldTypeSettingsInput } from './content-type-field-types/user-relation-field-type/user-relation-field-type-settings.input';
import { AssetRelationFieldTypeSettingsInput } from './content-type-field-types/asset-relation-field-type/asset-relation-field-type-settings.input';
import { ContentRelationFieldTypeSettingsInput } from './content-type-field-types/content-relation-field-type/content-relation-field-type-settings.input';

@InputType()
export class ContentTypeFieldInput {
  @Field()
  name: string;

  @Field()
  type: string;

  @Field(() => ContentTypeFieldSettingsInput)
  fieldSettings: ContentTypeFieldSettingsInput;

  @Field({ nullable: true })
  numberSettings?: NumberFieldTypeSettingsInput;

  @Field({ nullable: true })
  stringSettings?: StringFieldTypeSettingsInput;

  @Field({ nullable: true })
  booleanSettings?: BooleanFieldTypeSettingsInput;

  @Field({ nullable: true })
  dateSettings?: DateFieldTypeSettingsInput;

  @Field({ nullable: true })
  userSettings?: UserRelationFieldTypeSettingsInput;

  @Field({ nullable: true })
  assetSettings?: AssetRelationFieldTypeSettingsInput;

  @Field({ nullable: true })
  contentSettings?: ContentRelationFieldTypeSettingsInput;
}
