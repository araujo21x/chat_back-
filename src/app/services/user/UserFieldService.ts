import { FindOptionsWhere, Like, Not, SelectQueryBuilder } from 'typeorm';

import User from '@models/User.entity';
import IUserDTO from '@myTypes/body/IUserDTO';
import IQrsUser from '@myTypes/queryParams/IQrsUser';
import DateHandler from '@utils/DateHandler';
import hashPassword from '@utils/hashPassword';
import Status from '@myTypes/enums/Status';

class UserFieldService {
  public show(show: User): User {
    show.createdAt = DateHandler.clientFormat(show.createdAt);
    show.updatedAt = DateHandler.clientFormat(show.updatedAt);

    return show;
  }

  public list(users: User[]): User[] {
    return users.map((element: User) => this.show(element));
  }

  public getWhere(queries: IQrsUser): FindOptionsWhere<User> {
    const { id, notId, name, email, status } = queries;

    const where: FindOptionsWhere<User> = {};

    if (id) where.id = id;
    if (notId) where.id = Not(notId);
    if (name) where.name = Like(`%${name}%`);
    if (email) where.email = email;
    if (status && status !== 'Todos') where.status = status as Status;

    return where;
  }

  public getWhereQuery(
    queries: IQrsUser,
    query: SelectQueryBuilder<User>
  ): SelectQueryBuilder<User> {
    const { id, name, email, status, notId } = queries;

    if (id) {
      query.andWhere('user.id = :id', { id });
    }

    if (name) {
      query.andWhere('user.name like :name', { name: `%${name}%` });
    }

    if (email) {
      query.andWhere('user.email = :email', { email });
    }

    if (status && status !== 'Todos') {
      query.andWhere('user.status = :status', { status });
    }

    if (notId) {
      query.andWhere('user.id != :notId', { notId });
    }

    return query;
  }

  public factory(body: IUserDTO): User {
    const user: User = new User();

    if (body.email) user.email = body.email;
    if (body.name) user.name = body.name;
    if (body.status) user.status = body.status;
    if (body.password) user.password = hashPassword(body.password);

    if (body.imageKey && body.image) {
      user.image = body.image;
      user.imageKey = body.imageKey;
    }

    return user;
  }
}

export default new UserFieldService();
