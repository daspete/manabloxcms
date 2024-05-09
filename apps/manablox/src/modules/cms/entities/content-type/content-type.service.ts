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
    return (await this.contentTypeModel.findOne(query).exec()).toJSON();
  }

  async findById(id: string): Promise<ContentType> {
    return (await this.contentTypeModel.findById(id).exec()).toJSON();
  }

  async create(contentType: ContentType): Promise<ContentType> {
    return this.contentTypeModel.create(contentType);
  }

  async delete(id: string): Promise<ContentType> {
    return this.contentTypeModel.findByIdAndDelete(id).exec();
  }
}
