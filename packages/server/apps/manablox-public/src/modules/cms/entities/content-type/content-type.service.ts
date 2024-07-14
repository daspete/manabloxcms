import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContentType } from './content-type.model';
import { Model } from 'mongoose';

@Injectable()
export class ContentTypeService {
  constructor(
    @InjectModel('ContentType')
    private readonly contentTypeModel: Model<ContentType>,
  ) {}

  async findAll(): Promise<ContentType[]> {
    return this.contentTypeModel.find().lean();
  }

  async find(query: any): Promise<ContentType[]> {
    return this.contentTypeModel.find(query).lean();
  }

  async findOne(query: any): Promise<ContentType> {
    return this.contentTypeModel.findOne(query).lean();
  }

  async findById(contentTypeId: string): Promise<ContentType> {
    return this.contentTypeModel
      .findOne({ contentTypeId: contentTypeId })
      .lean();
  }
}
