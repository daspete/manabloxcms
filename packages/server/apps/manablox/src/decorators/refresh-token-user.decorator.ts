import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RefreshUser } from '../modules/auth/entities/refresh-user.type';

export const RefreshTokenUser = createParamDecorator(
  (data, context: ExecutionContext): RefreshUser => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
