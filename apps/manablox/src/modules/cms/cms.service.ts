import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from './entities/content/content.model';

@Injectable()
export class CmsService {
  constructor(
    @InjectModel('Content') private readonly contentModel: Model<Content>,
  ) {}

  async findAll(): Promise<Content[]> {
    const items = await this.contentModel.find().exec();
    return items.map((item) => item.toJSON());
  }

  async findOne(id: string): Promise<Content> {
    return (await this.contentModel.findById(id).exec()).toJSON();
  }

  async create(content: Content): Promise<Content> {
    return this.contentModel.create(content);
  }

  async delete(id: string): Promise<Content> {
    return this.contentModel.findByIdAndDelete(id).exec();
  }
}
