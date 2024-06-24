import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asset } from './entities/asset/asset.model';
import { AssetInput } from './entities/asset/asset.input';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel('Asset') private readonly assetModel: Model<Asset>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<Asset[]> {
    const items = await this.assetModel.find().exec();
    return items.map((item) => item.toJSON());
  }

  async findById(assetId: string): Promise<Asset> {
    const asset = await this.assetModel.findOne({ assetId }).exec();
    if (!asset) return null;
    return asset.toJSON();
  }

  async findOne(query: any): Promise<Asset> {
    const asset = await this.assetModel.findOne(query).exec();
    if (!asset) return null;
    return asset.toJSON();
  }

  async create(asset: AssetInput): Promise<Asset> {
    return this.assetModel.create(asset);
  }

  async delete(assetId: string): Promise<Asset> {
    return this.assetModel.findOneAndDelete({ assetId }).exec();
  }
}
