import database from '@db/index';
import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import Message from '@models/Message.entity';
import IMessageDTO from '@myTypes/body/IMessageDTO';
import IMessageList from '@myTypes/list/IMessageList';
import IQrsMessage from '@myTypes/queryParams/IQrsMessage';
import { EntityManager } from 'typeorm';
import Room from '@models/Room.entity';
import messageFieldService from './MessageFieldService';
import RelationsMessage, { IRelationMessageKey } from './RelationsMessage';

class MessageService {
  public async searchBy(
    queries: IQrsMessage,
    relation: IRelationMessageKey = 'basic'
  ): Promise<Message | null> {
    const message: Message | null = await database
      .getRepository(Message)
      .findOne({
        where: messageFieldService.getWhere(queries),
        relations: RelationsMessage.relations[relation],
      });

    return message;
  }

  public async getBy(
    queries: IQrsMessage,
    relation?: IRelationMessageKey
  ): Promise<Message> {
    const message: Message | null = await this.searchBy(queries, relation);
    if (!message) throw new AppError(errorMessages.USER_NOT_FOUND, 404);

    return messageFieldService.show(message);
  }

  public async create(
    body: IMessageDTO,
    trx?: EntityManager
  ): Promise<Message> {
    const db = trx ?? database;

    const message: Message = await db
      .getRepository(Message)
      .save(messageFieldService.factory(body));

    await db
      .getRepository(Room)
      .update({ id: (body.room as Room).id }, { lastManipulation: new Date() });

    return message;
  }

  public async index(
    queries: IQrsMessage,
    relation: IRelationMessageKey = 'default'
  ): Promise<IMessageList> {
    const result = await database.getRepository(Message).findAndCount({
      where: messageFieldService.getWhere(queries),
      relations: RelationsMessage.relations[relation],
    });

    return {
      messages: messageFieldService.list(result[0]),
      countMessages: result[1],
    };
  }

  public async edit(
    body: IMessageDTO,
    id: number,
    trx?: EntityManager
  ): Promise<void> {
    const db = trx ?? database;

    await db
      .getRepository(Message)
      .update({ id }, messageFieldService.factory(body));
  }
}

export default new MessageService();
