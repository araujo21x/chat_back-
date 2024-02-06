import database from '@db/index';
import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import Room from '@models/Room.entity';
import IRoomDTO from '@myTypes/body/IRoomDTO';
import IRoomList from '@myTypes/list/IRoomList';
import IQrsRoom from '@myTypes/queryParams/IQrsRoom';
import { EntityManager } from 'typeorm';
import User from '@models/User.entity';
import TypeRoom from '@myTypes/enums/TypeRoom';
import UserHasRoom from '@models/UserHasRoom.entity';
import roomFieldService from './RoomFieldService';
import RelationsRoom, { IRelationRoomKey } from './RelationsRoom';

class RoomService {
  public async searchBy(
    queries: IQrsRoom,
    relation: IRelationRoomKey = 'complete'
  ): Promise<Room | null> {
    const room: Room | null = await database.getRepository(Room).findOne({
      where: roomFieldService.getWhere(queries),
      relations: RelationsRoom.relations[relation],
      order: { messages: { createdAt: 'ASC' } },
    });

    return room;
  }

  public async getBy(
    queries: IQrsRoom,
    relation: IRelationRoomKey = 'complete'
  ): Promise<Room> {
    const room: Room | null = await this.searchBy(queries, relation);
    if (!room) throw new AppError(errorMessages.ROOM_NOT_FOUND, 404);

    return roomFieldService.show(room, queries.chatHandler);
  }

  public async create(body: IRoomDTO, trx?: EntityManager): Promise<Room> {
    const db = trx ?? database;

    const room: Room = await db
      .getRepository(Room)
      .save(roomFieldService.factory(body));

    return room;
  }

  public async index(
    queries: IQrsRoom,
    relation: IRelationRoomKey = 'complete'
  ): Promise<IRoomList> {
    const result = await database.getRepository(User).findOne({
      where: {
        id: queries.chatHandler?.userId,
        userHasRooms: { room: roomFieldService.getWhere(queries) },
      },
      relations: { userHasRooms: { room: RelationsRoom.relations[relation] } },
      order: { userHasRooms: { room: { lastManipulation: 'DESC' } } },
    });

    const rooms: Room[] = [];
    if (result && result.userHasRooms.length > 0) {
      result.userHasRooms.forEach((element) => {
        rooms.push(element.room);
      });
    }

    return {
      rooms: roomFieldService.list(rooms, queries.chatHandler),
      countRooms: rooms.length,
    };
  }

  public async edit(
    body: IRoomDTO,
    id: number,
    trx?: EntityManager
  ): Promise<void> {
    const db = trx ?? database;

    await db.getRepository(Room).update({ id }, roomFieldService.factory(body));
  }

  public getUserRoom(room: Room, userId: number): User {
    let user: User | undefined;

    room.userHasRooms.forEach((element) => {
      if (element.user.id === userId) user = element.user;
    });

    if (!user) {
      throw new AppError(errorMessages.USER_ALREADY_EXIST_IN_ROOM, 401);
    }

    return user;
  }

  public roomIsInArray(rooms: IRoomList, room: Room): IRoomList {
    const exist = rooms.rooms.filter((element) => element.id === room.id);
    if (exist) return rooms;

    rooms.rooms.push(room);
    rooms.countRooms += 1;

    return rooms;
  }

  public async privateRoomExist(
    userId: number,
    addressesId: number
  ): Promise<any> {
    const rooms = await this.index(
      {
        usersIds: [userId, addressesId],
        type: TypeRoom.PRIVATE,
        paginate: 'not',
      },
      'complete'
    );

    let answer = false;
    let room: null | Room = null;

    rooms.rooms.forEach((element: Room) => {
      let send = false;
      let addresses = false;

      element.userHasRooms.forEach((userHasRoom: UserHasRoom) => {
        if (userHasRoom.user.id === userId) {
          send = true;
        }
        if (userHasRoom.user.id === addressesId) {
          addresses = true;
        }
      });

      if (send && addresses) {
        answer = true;
        room = element;
      }
    });

    return { answer, room };
  }
}

export default new RoomService();
