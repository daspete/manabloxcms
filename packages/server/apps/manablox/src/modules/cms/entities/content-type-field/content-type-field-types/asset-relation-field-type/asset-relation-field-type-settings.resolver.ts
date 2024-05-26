import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AssetRelationFieldTypeSettings } from './asset-relation-field-type.model';
import { AssetService } from 'apps/manablox/src/modules/asset/asset.service';
import { Asset } from 'apps/manablox/src/modules/asset/entities/asset/asset.model';

@Resolver(() => AssetRelationFieldTypeSettings)
export class AssetRelationFieldTypeSettingsResolver {
  constructor(private readonly assetService: AssetService) {}

  @ResolveField(() => Asset, { nullable: true })
  async defaultValue(@Parent() parent: AssetRelationFieldTypeSettings) {
    if (!parent.defaultValue) return null;
    return this.assetService.findOne(parent.defaultValue);
  }
}
