import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asset } from './entities/asset/asset.model';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel('Asset') private readonly assetModel: Model<Asset>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<Asset[]> {
    return this.assetModel.find().lean();
  }

  async findById(assetId: string): Promise<Asset> {
    return this.assetModel.findOne({ assetId }).lean();
  }

  async findOne(query: any): Promise<Asset> {
    return this.assetModel.findOne(query).lean();
  }
}
