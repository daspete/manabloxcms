import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BlockItemFieldTypeSettings } from './block-item-field-type.model';
import { ContentTypeService } from '../../../content-type/content-type.service';

@Resolver(() => BlockItemFieldTypeSettings)
export class BlockItemFieldTypeSettingsResolver {
  constructor(private readonly contentTypeService: ContentTypeService) {}

  @ResolveField()
  async blockType(@Parent() blockSettings: BlockItemFieldTypeSettings) {
    return this.contentTypeService.findById(blockSettings.blockType);
  }
}
