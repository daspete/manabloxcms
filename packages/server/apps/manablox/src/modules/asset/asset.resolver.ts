import { /* Args, Mutation,*/ Query, Resolver } from '@nestjs/graphql';
import { Asset } from './entities/asset/asset.model';
import { AssetService } from './asset.service';
// import { AssetInput } from './entities/asset/asset.input';

@Resolver(() => Asset)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  @Query(() => [Asset])
  async assets() {
    return this.assetService.findAll();
  }

  // @Mutation(() => Asset)
  // async createAsset(@Args('asset') asset: AssetInput) {
  //   return this.assetService.create(asset);
  // }
}
