import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AssetService } from 'apps/manablox-public/src/modules/asset/asset.service';
import { AssetRelationField } from './asset-relation-field.model';

@Resolver(() => AssetRelationField)
export class AssetRelationFieldResolver {
  constructor(private readonly assetService: AssetService) {}

  @ResolveField()
  async asset(@Parent() parent: AssetRelationField) {
    if (!parent.asset) return null;
    return this.assetService.findById(parent.asset);
  }
}
