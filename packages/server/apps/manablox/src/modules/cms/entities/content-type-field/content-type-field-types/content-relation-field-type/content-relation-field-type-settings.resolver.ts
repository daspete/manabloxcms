import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { ContentRelationFieldTypeSettings } from "./content-relation-field-type.model";
import { ContentService } from "../../../content/content.service";
import { Content } from "../../../content/content.model";

@Resolver(() => ContentRelationFieldTypeSettings)
export class ContentRelationFieldTypeSettingsResolver {
  constructor(private readonly contentService: ContentService) {}

  @ResolveField(() => Content, { nullable: true })
  async defaultValue(@Parent() parent: ContentRelationFieldTypeSettings) {
    if(!parent.defaultValue) return null;
    return this.contentService.findOne(parent.defaultValue);
  }
}
