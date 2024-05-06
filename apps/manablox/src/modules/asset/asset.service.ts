import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asset } from './entities/asset/asset.model';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel('Asset') private readonly assetModel: Model<Asset>,
  ) {}

  async findAll(): Promise<Asset[]> {
    const items = await this.assetModel.find().exec();
    return items.map((item) => item.toJSON());
  }

  async findOne(id: string): Promise<Asset> {
    return (await this.assetModel.findById(id).exec()).toJSON();
  }

  async create(asset: Asset): Promise<Asset> {
    return this.assetModel.create(asset);
  }

  async delete(id: string): Promise<Asset> {
    return this.assetModel.findByIdAndDelete(id).exec();
  }
}
