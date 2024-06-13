import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../modules/user/entities/user/user.model';
import { GqlExecutionContext } from '@nestjs/graphql';

export const RequestUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
