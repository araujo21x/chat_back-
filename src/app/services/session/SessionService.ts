import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import database from '@db/index';
import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import User from '@models/User.entity';
import ILogin from '@myTypes/body/ILogin';
import Status from '@myTypes/enums/Status';
import IAuthorized from '@myTypes/generics/IAuthorized';
import auth from '@config/auth';
import userFieldService from '@services/user/UserFieldService';

class SessionService {
  public async standardLogin(body: ILogin): Promise<IAuthorized> {
    let user = await this.getUserSession(body.email);

    await this.comparePassword(user.password, body.password);

    user.password = '*******';
    user = userFieldService.show(user);

    return { token: this.generateJWT(user.id), user };
  }

  private async getUserSession(email: string): Promise<User> {
    const user: User | null = await database
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .select([
        'user.id',
        'user.name',
        'user.image',
        'user.imageKey',
        'user.email',
        'user.password',
        'user.status',
        'user.createdAt',
        'user.updatedAt',
      ])
      .getOne();

    if (!user) throw new AppError(errorMessages.USER_NOT_FOUND, 404);

    if (user.status === Status.INACTIVE) {
      throw new AppError(errorMessages.ACCESS_DENIED, 404);
    }

    return user;
  }

  private async comparePassword(
    userPassword: string,
    password: string
  ): Promise<void> {
    const validPassword = await bcryptjs.compare(password, userPassword);
    if (!validPassword) {
      throw new AppError(errorMessages.INVALID_CREDENTIALS, 400);
    }
  }

  public generateJWT(userId: number): string {
    return jwt.sign({ userId }, auth.secret, {});
  }
}

export default new SessionService();
