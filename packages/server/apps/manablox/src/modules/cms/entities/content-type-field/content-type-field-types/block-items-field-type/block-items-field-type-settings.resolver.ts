import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BlockItemsFieldTypeSettings } from './block-items-field-type.model';
import { ContentTypeService } from '../../../content-type/content-type.service';
import mongoose from 'mongoose';

@Resolver(() => BlockItemsFieldTypeSettings)
export class BlockItemsFieldTypeSettingsResolver {
  constructor(private readonly contentTypeService: ContentTypeService) {}

  @ResolveField()
  async possibleBlockTypes(
    @Parent() blocksSettings: BlockItemsFieldTypeSettings,
  ) {
    return this.contentTypeService.find({
      _id: {
        $in: blocksSettings.possibleBlockTypes.map(
          (blockTypeId) => new mongoose.Types.ObjectId(blockTypeId),
        ),
      },
    });
  }
}
