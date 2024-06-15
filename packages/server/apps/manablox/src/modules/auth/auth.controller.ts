import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('auth.user.find')
  async findOne(data: any) {
    return this.userService.findOne(data);
  }
}
