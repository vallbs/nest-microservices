import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../users/models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  const user = context.switchToHttp().getRequest().user;
  console.log('SOA.getCurrentUserByContext', user);

  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, executionContext: ExecutionContext) =>
    getCurrentUserByContext(executionContext),
);
