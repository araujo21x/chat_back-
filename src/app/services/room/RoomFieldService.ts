import { FindOptionsWhere, In, Like, Not } from 'typeorm';

import Room from '@models/Room.entity';
import IRoomDTO from '@myTypes/body/IRoomDTO';
import IQrsRoom from '@myTypes/queryParams/IQrsRoom';
import DateHandler from '@utils/DateHandler';
import TypeRoom from '@myTypes/enums/TypeRoom';
import IChatHandler from '@myTypes/IChatHandler';
import chatService from 'src/app/socket/chat/ChatService';

class RoomFieldService {
  public show(show: Room, chatHandler?: IChatHandler): Room {
    show.createdAt = DateHandler.clientFormat(show.createdAt);
    show.updatedAt = DateHandler.clientFormat(show.updatedAt);

    if (chatHandler && chatHandler.handler && show.type === TypeRoom.PRIVATE) {
      if (show.userHasRooms[0].user.id === chatHandler.userId) {
        show.myUser = show.userHasRooms[0].user;
        show.addresseeUser = show.userHasRooms[1].user;
      } else {
        show.myUser = show.userHasRooms[1].user;
        show.addresseeUser = show.userHasRooms[0].user;
      }

      show.addresseeUser.online = !!chatService.findBy({
        id: show.addresseeUser.id,
      });
    }

    return show;
  }

  public list(rooms: Room[], chatHandler?: IChatHandler): Room[] {
    return rooms.map((element: Room) => this.show(element, chatHandler));
  }

  public getWhere(queries: IQrsRoom): FindOptionsWhere<Room> {
    const { id, notId, type, name, userId, usersIds } = queries;

    const where: FindOptionsWhere<Room> = {};

    if (id) where.id = id;
    if (notId) where.id = Not(notId);
    if (type) where.type = type as TypeRoom;
    if (name) where.name = Like(`%${name}%`);
    if (userId) where.userHasRooms = { user: { id: userId } };
    if (usersIds) where.userHasRooms = { user: { id: In(usersIds) } };

    return where;
  }

  public factory(body: IRoomDTO): Room {
    const room: Room = new Room();

    if (body.type) room.type = body.type;
    if (body.name) room.name = body.name;
    if (body.description) room.description = body.description;
    if (body.imageKey && body.image) {
      room.image = body.image;
      room.imageKey = body.imageKey;
    }

    return room;
  }
}

export default new RoomFieldService();
