import { Controller } from '@nestjs/common';
import { AssetService } from './asset.service';
import { MessagePattern } from '@nestjs/microservices';
import { AssetInput } from './entities/asset/asset.input';

@Controller()
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @MessagePattern('assets.file.uploaded')
  async uploaded(data: AssetInput) {
    return this.assetService.create(data);
  }
}
