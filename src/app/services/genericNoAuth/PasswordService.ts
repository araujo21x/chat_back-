import database from '@db/index';
import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import User from '@models/User.entity';
import IForgetFields from '@myTypes/generics/IForgetFields';
import hashPassword from '@utils/hashPassword';
import crypto from 'crypto';

class PasswordService {
  public async forgot(email: string): Promise<string> {
    const { passwordResetExpires, passwordResetToken } =
      this.generateForgetFields();

    await database.getRepository(User).update(
      { email },
      {
        passwordResetExpires,
        passwordResetToken,
      }
    );

    return passwordResetToken;
  }

  public generateForgetFields(): IForgetFields {
    const passwordResetToken: string = crypto
      .randomBytes(9)
      .toString('hex')
      .slice(0, 6);

    const now: Date = new Date();
    now.setHours(now.getHours() + 4);

    return { passwordResetExpires: now, passwordResetToken };
  }

  public async getUserByCodeReset(code: string): Promise<User> {
    const user: User | null = await database.getRepository(User).findOne({
      where: { passwordResetToken: code },
      select: {
        id: true,
        passwordResetExpires: true,
        passwordResetToken: true,
      },
    });

    if (!user) throw new AppError(errorMessages.USER_NOT_FOUND, 404);

    return user;
  }

  public resetTokenIsValid(expirationDate: Date): void {
    const now: Date = new Date();

    if (now >= expirationDate) {
      throw new AppError(errorMessages.EXPIRED_PASSWORD_REGISTER, 400);
    }
  }

  public async reset(id: number, password: string): Promise<void> {
    await database.getRepository(User).update(
      { id },
      {
        passwordResetToken: null as any,
        passwordResetExpires: null as any,
        password: hashPassword(password),
      }
    );
  }
}

export default new PasswordService();
