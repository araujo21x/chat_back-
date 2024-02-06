import database from '@db/index';
import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import UserHasRoom from '@models/UserHasRoom.entity';
import IUserHasRoomDTO from '@myTypes/body/IUserHasRoomDTO';
import IQrsUserHasRoom from '@myTypes/queryParams/IQrsUserHasRoom';
import { EntityManager } from 'typeorm';
import userHasRoomFieldService from './UserHasRoomFieldService';
import RelationsUserHasRoom, {
  IRelationUserHasRoomKey,
} from './RelationsUserHasRoom';

class UserHasRoomService {
  public async searchBy(
    queries: IQrsUserHasRoom,
    relation: IRelationUserHasRoomKey = 'default'
  ): Promise<UserHasRoom | null> {
    const userHasRoom: UserHasRoom | null = await database
      .getRepository(UserHasRoom)
      .findOne({
        where: userHasRoomFieldService.getWhere(queries),
        relations: RelationsUserHasRoom.relations[relation],
      });

    return userHasRoom;
  }

  public async getBy(
    queries: IQrsUserHasRoom,
    relation?: IRelationUserHasRoomKey
  ): Promise<UserHasRoom> {
    const userHasRoom: UserHasRoom | null = await this.searchBy(
      queries,
      relation
    );
    if (!userHasRoom) throw new AppError(errorMessages.ROOM_NOT_FOUND, 404);

    return userHasRoomFieldService.show(userHasRoom);
  }

  public async create(
    body: IUserHasRoomDTO,
    trx?: EntityManager
  ): Promise<UserHasRoom> {
    const db = trx ?? database;

    const userHasRoom: UserHasRoom = await db
      .getRepository(UserHasRoom)
      .save(userHasRoomFieldService.factory(body));

    return userHasRoom;
  }

  public async edit(
    body: IUserHasRoomDTO,
    id: number,
    trx?: EntityManager
  ): Promise<void> {
    const db = trx ?? database;

    await db
      .getRepository(UserHasRoom)
      .update({ id }, userHasRoomFieldService.factory(body));
  }
}

export default new UserHasRoomService();
