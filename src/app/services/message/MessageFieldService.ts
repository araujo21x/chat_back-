import { FindOptionsWhere, Not } from 'typeorm';

import Message from '@models/Message.entity';
import IMessageDTO from '@myTypes/body/IMessageDTO';
import IQrsMessage from '@myTypes/queryParams/IQrsMessage';
import DateHandler from '@utils/DateHandler';
import userFieldService from '@services/user/UserFieldService';
import roomFieldService from '@services/room/RoomFieldService';

class MessageFieldService {
  public show(show: Message): Message {
    show.createdAt = DateHandler.clientFormat(show.createdAt);
    show.updatedAt = DateHandler.clientFormat(show.updatedAt);

    return show;
  }

  public list(messages: Message[]): Message[] {
    return messages.map((element: Message) => this.show(element));
  }

  public getWhere(queries: IQrsMessage): FindOptionsWhere<Message> {
    const { id, notId, sender, room } = queries;

    const where: FindOptionsWhere<Message> = {};

    if (id) where.id = id;
    if (notId) where.id = Not(notId);
    if (sender) where.sender = userFieldService.getWhere(sender);
    if (room) where.room = roomFieldService.getWhere(room);

    return where;
  }

  public factory(body: IMessageDTO): Message {
    const message: Message = new Message();

    if (body.content) message.content = body.content;
    if (body.sender) message.sender = body.sender;
    if (body.room) message.room = body.room;

    if (body.imageKey && body.image) {
      message.image = body.image;
      message.imageKey = body.imageKey;
    }

    return message;
  }
}

export default new MessageFieldService();
