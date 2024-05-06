import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const items = await this.userModel.find().exec();
    return items.map((item) => item.toJSON());
  }

  async findOne(id: string): Promise<User> {
    return (await this.userModel.findById(id).exec()).toJSON();
  }

  async create(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
