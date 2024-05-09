import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from './content.model';
import { ContentInput } from './content.input';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel('Content') private readonly contentModel: Model<Content>,
  ) {}

  async findAll(): Promise<Content[]> {
    const items = await this.contentModel.find().exec();
    return items.map((item) => item.toJSON());
  }

  async find(query: any): Promise<Content[]> {
    const items = await this.contentModel.find(query).exec();
    return items.map((item) => item.toJSON());
  }

  async findOne(id: string): Promise<Content> {
    return (await this.contentModel.findById(id).exec()).toJSON();
  }

  async create(content: ContentInput): Promise<Content> {
    return this.contentModel.create(content);
  }

  async delete(id: string): Promise<Content> {
    return this.contentModel.findByIdAndDelete(id).exec();
  }
}
