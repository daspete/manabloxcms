import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AssetService } from 'apps/manablox/src/modules/asset/asset.service';
import { AssetRelationField } from './asset-relation-field.model';

@Resolver(() => AssetRelationField)
export class AssetRelationFieldResolver {
  constructor(private readonly assetService: AssetService) {}

  @ResolveField()
  async asset(@Parent() parent: AssetRelationField) {
    return this.assetService.findById(parent.asset);
  }
}
