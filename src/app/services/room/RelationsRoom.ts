import Room from '@models/Room.entity';
import { FindOptionsRelations } from 'typeorm';

export type IRelationRoomKey = 'basic' | 'default' | 'complete';

interface IRelation {
  basic: FindOptionsRelations<Room>;
  default: FindOptionsRelations<Room>;
  complete: FindOptionsRelations<Room>;
}

class RelationsRoom {
  static readonly relations: IRelation = {
    basic: {},
    default: { userHasRooms: true, messages: true },
    complete: { messages: { sender: true }, userHasRooms: { user: true } },
  };
}

export default RelationsRoom;
