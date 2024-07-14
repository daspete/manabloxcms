import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user/user.model';
import { Model } from 'mongoose';
import { UserInput } from './entities/user/user.input';
import { isEmail, isStrongPassword, isUUID } from 'class-validator';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().lean();
  }

  async find(query: any): Promise<User[]> {
    return this.userModel.find(query).lean();
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findOne({ userId }).lean();
  }

  async findOne(query: any): Promise<User> {
    return this.userModel.findOne(query).lean();
  }

  async create(user: UserInput): Promise<User> {
    await this.validateAndSanitizeInput(user);

    user.password = await hash(user.password, 10);

    return this.userModel.create(user);
  }

  async update(user: Partial<UserInput>): Promise<User> {
    await this.validateAndSanitizeInput(user, true);
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

  async updateRefreshToken(userId: string, refreshToken: string) {
    return this.userModel
      .updateOne({ userId }, { $set: { refreshToken } })
      .exec();
  }

  async validateAndSanitizeInput(input: Partial<UserInput>, isUpdate = false) {
    const errors = [];

    if (!isUpdate) {
      if (!input.userId) {
        input.userId = randomUUID();
      } else {
        const existingUser = await this.userModel
          .findOne({ userId: input.userId })
          .exec();
        if (existingUser) {
          errors.push('user.userId.unique');
        }
      }
    }

    if (!isUUID(input.userId, 'all')) {
      errors.push('user.userId.invalid');
    }

    if (!isEmail(input.email)) {
      console.log('input', input);
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
