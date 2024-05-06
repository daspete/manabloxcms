import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AssetRelationField } from './asset-relation-field.model';
import { AssetService } from '../../asset.service';

@Resolver(() => AssetRelationField)
export class AssetRelationFieldResolver {
  constructor(private readonly assetService: AssetService) {}

  @ResolveField()
  async asset(@Parent() parent: AssetRelationField) {
    return this.assetService.findOne(parent.asset);
  }
}
