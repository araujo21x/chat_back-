import Message from '@models/Message.entity';
import { FindOptionsRelations } from 'typeorm';

export type IRelationMessageKey = 'basic' | 'default' | 'complete';

interface IRelation {
  basic: FindOptionsRelations<Message>;
  default: FindOptionsRelations<Message>;
  complete: FindOptionsRelations<Message>;
}

class RelationsMessage {
  static readonly relations: IRelation = {
    basic: {},
    default: { sender: true },
    complete: { sender: true, room: true },
  };
}

export default RelationsMessage;
