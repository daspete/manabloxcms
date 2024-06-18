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
    const items = await this.contentTypeModel.find().exec();
    return items.map((item) => item.toJSON());
  }

  async find(query: any): Promise<ContentType[]> {
    const items = await this.contentTypeModel.find(query).exec();
    return items.map((item) => item.toJSON());
  }

  async findOne(query: any): Promise<ContentType> {
    const contentType = await this.contentTypeModel.findOne(query).exec();
    if (!contentType) return null;
    return contentType.toJSON();
  }

  async findById(contentTypeId: string): Promise<ContentType> {
    const contentType = await this.contentTypeModel
      .findOne({ contentTypeId: contentTypeId })
      .exec();
    if (!contentType) return null;
    return contentType.toJSON();
  }
}
