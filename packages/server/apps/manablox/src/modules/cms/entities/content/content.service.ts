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

  async findOne(query: any): Promise<Content> {
    return (await this.contentModel.findOne(query).exec()).toJSON();
  }

  async findById(id: string): Promise<Content> {
    return (await this.contentModel.findById(id).exec()).toJSON();
  }

  async create(content: ContentInput): Promise<Content> {
    return this.contentModel.create(content);
  }

  async update(content: ContentInput): Promise<Content> {
    const { contentId, ...dataToUpdate } = content;

    await this.contentModel.updateOne({ contentId }, { $set: dataToUpdate });

    return this.contentModel.findOne({ contentId }).exec();
  }

  async delete(contentId: string): Promise<Content> {
    return this.contentModel.findOneAndDelete({ contentId }).exec();
  }
}
