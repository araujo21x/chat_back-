import { Request } from 'express';

import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import User from '@models/User.entity';
import Status from '@myTypes/enums/Status';
import userService from '@services/user/UserService';

class AllowedUser {
  public async userGeneric(req: Request): Promise<User> {
    const { userId: id } = req;

    const user: User = await userService.getBy({ id });

    if (user.status !== Status.ACTIVE) {
      throw new AppError(errorMessages.ACCESS_DENIED, 403);
    }

    return user;
  }
}

export default new AllowedUser();
