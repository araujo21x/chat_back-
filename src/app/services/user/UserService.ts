import database from '@db/index';
import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import User from '@models/User.entity';
import IUserDTO from '@myTypes/body/IUserDTO';
import IUserList from '@myTypes/list/IUserList';
import IQrsUser from '@myTypes/queryParams/IQrsUser';
import { isPaginationQueryBuild } from '@utils/isPagination';
import { EntityManager } from 'typeorm';
import userFieldService from './UserFieldService';
import RelationsUser, { IRelationUserKey } from './RelationsUser';

class UserService {
  public async searchBy(
    queries: IQrsUser,
    relation: IRelationUserKey = 'basic'
  ): Promise<User | null> {
    const user: User | null = await database.getRepository(User).findOne({
      where: userFieldService.getWhere(queries),
      relations: RelationsUser.relations[relation],
    });

    return user;
  }

  public async getBy(
    queries: IQrsUser,
    relation?: IRelationUserKey
  ): Promise<User> {
    const user: User | null = await this.searchBy(queries, relation);
    if (!user) throw new AppError(errorMessages.USER_NOT_FOUND, 404);

    return userFieldService.show(user);
  }

  public async existInDb(queries: IQrsUser): Promise<void> {
    const query = database.getRepository(User).createQueryBuilder('user');

    if (queries.email) {
      query.orWhere('user.email = :email', { email: queries.email });
    }

    const user = await query.getMany();
    user.forEach((element) => {
      if (element.id !== queries.notId) {
        throw new AppError(errorMessages.USER_ALREADY_EXISTS, 404);
      }
    });
  }

  public async create(body: IUserDTO, trx?: EntityManager): Promise<User> {
    const db = trx ?? database;

    const user: User = await db
      .getRepository(User)
      .save(userFieldService.factory(body));

    return user;
  }

  public async index(queries: IQrsUser): Promise<IUserList> {
    const query = database
      .getRepository(User)
      .createQueryBuilder('user')
      .orderBy('user.name', 'ASC');

    userFieldService.getWhereQuery(queries, query);
    isPaginationQueryBuild(queries, query);

    const result = await query.getManyAndCount();

    return {
      users: userFieldService.list(result[0]),
      countUsers: result[1],
    };
  }

  public async edit(
    body: IUserDTO,
    id: number,
    trx?: EntityManager
  ): Promise<void> {
    const db = trx ?? database;

    await db.getRepository(User).update({ id }, userFieldService.factory(body));
  }
}

export default new UserService();
