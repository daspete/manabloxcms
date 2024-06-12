import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user/user.model';
import { Model } from 'mongoose';
import { UserInput } from './entities/user/user.input';
import { isEmail, isStrongPassword, isUUID } from 'class-validator';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const items = await this.userModel.find().exec();
    return items.map((item) => item.toJSON());
  }

  async findById(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ userId }).exec();
    if (!user) return null;
    return user.toJSON();
  }

  async create(user: UserInput): Promise<User> {
    await this.validateInput(user);

    user.password = await hash(user.password, 10);

    return this.userModel.create(user);
  }

  async update(user: UserInput): Promise<User> {
    await this.validateInput(user, true);
    const { userId, ...dataToUpdate } = user;

    if (dataToUpdate.password) {
      dataToUpdate.password = await hash(dataToUpdate.password, 10);
    }

    await this.userModel.updateOne({ userId }, { $set: dataToUpdate }).exec();

    return this.findById(userId);
  }

  async delete(userId: string): Promise<User> {
    return this.userModel.findOneAndDelete({ userId }).exec();
  }

  async validateInput(input: UserInput, isUpdate = false) {
    const errors = [];

    if (!isUUID(input.userId, 'all')) {
      errors.push('user.userId.invalid');
    } else {
      if (!isUpdate) {
        const existingUser = await this.userModel
          .findOne({ userId: input.userId })
          .exec();

        if (existingUser) {
          errors.push('user.userId.unique');
        }
      }
    }

    if (!isEmail(input.email)) {
      errors.push('user.email.invalid');
    } else {
      const existingUser = await this.userModel
        .findOne({ email: input.email, userId: { $ne: input.userId } })
        .exec();

      if (existingUser) {
        errors.push('user.email.unique');
      }
    }

    if (!isUpdate && !input.password) {
      errors.push('user.password.required');
    }

    if (
      input.password &&
      !isStrongPassword(input.password, {
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
        minLowercase: 1,
      })
    ) {
      errors.push('user.password.weak');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }
}
