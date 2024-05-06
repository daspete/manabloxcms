import { Query, Resolver } from '@nestjs/graphql';
import { Asset } from './entities/asset/asset.model';
import { AssetService } from './asset.service';

@Resolver(() => Asset)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  @Query(() => [Asset])
  async assets(): Promise<Asset[]> {
    return this.assetService.findAll();
  }
}
