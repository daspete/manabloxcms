import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AssetRelationFieldTypeSettingsInput {
  @Field({ nullable: true })
  defaultValue?: boolean;
}
