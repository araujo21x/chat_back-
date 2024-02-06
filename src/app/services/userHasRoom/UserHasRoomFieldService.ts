import { FindOptionsWhere, Not } from 'typeorm';

import UserHasRoom from '@models/UserHasRoom.entity';
import IUserHasRoomDTO from '@myTypes/body/IUserHasRoomDTO';
import IQrsUserHasRoom from '@myTypes/queryParams/IQrsUserHasRoom';
import DateHandler from '@utils/DateHandler';

class UserHasRoomFieldService {
  public show(show: UserHasRoom): UserHasRoom {
    show.createdAt = DateHandler.clientFormat(show.createdAt);
    show.updatedAt = DateHandler.clientFormat(show.updatedAt);

    return show;
  }

  public list(rooms: UserHasRoom[]): UserHasRoom[] {
    return rooms.map((element: UserHasRoom) => this.show(element));
  }

  public getWhere(queries: IQrsUserHasRoom): FindOptionsWhere<UserHasRoom> {
    const { id, notId } = queries;

    const where: FindOptionsWhere<UserHasRoom> = {};

    if (id) where.id = id;
    if (notId) where.id = Not(notId);

    return where;
  }

  public factory(body: IUserHasRoomDTO): UserHasRoom {
    const uHRoom: UserHasRoom = new UserHasRoom();

    if (body.user) uHRoom.user = body.user;
    if (body.room) uHRoom.room = body.room;

    return uHRoom;
  }
}

export default new UserHasRoomFieldService();
