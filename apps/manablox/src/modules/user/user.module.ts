import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user/user.model';
import { UserRelationFieldResolver } from './entities/user-relation-field/user-relation-field.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [UserService, UserResolver, UserRelationFieldResolver],
})
export class UserModule {}
