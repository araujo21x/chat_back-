import UserHasRoom from '@models/UserHasRoom.entity';
import { FindOptionsRelations } from 'typeorm';

export type IRelationUserHasRoomKey = 'basic' | 'default' | 'complete';

interface IRelation {
  basic: FindOptionsRelations<UserHasRoom>;
  default: FindOptionsRelations<UserHasRoom>;
  complete: FindOptionsRelations<UserHasRoom>;
}

class RelationsUserHasRoom {
  static readonly relations: IRelation = {
    basic: {},
    default: { user: true },
    complete: {
      user: true,
      room: true,
    },
  };
}

export default RelationsUserHasRoom;
