import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Asset } from './entities/asset/asset.model';
import { AssetService } from './asset.service';
import { ConfigService } from '@nestjs/config';

@Resolver(() => Asset)
export class AssetResolver {
  constructor(
    private readonly assetService: AssetService,
    private readonly configService: ConfigService,
  ) {}

  @Query(() => [Asset])
  async assets() {
    return this.assetService.findAll();
  }

  @ResolveField(() => String, { nullable: true })
  url(@Parent() asset: Asset) {
    if (asset.disk === 'local') {
      return (
        this.configService.get<string>('FILE_DISK_LOCAL_URL') + `/${asset.path}`
      );
    }

    return null;
  }

  // @Mutation(() => Asset)
  // async createAsset(@Args('asset') asset: AssetInput) {
  //   return this.assetService.create(asset);
  // }
}
