import database from '@db/index';
import Room from '@models/Room.entity';
import TypeRoom from '@myTypes/enums/TypeRoom';
import roomService from '@services/room/RoomService';
import userService from '@services/user/UserService';
import userHasRoomService from '@services/userHasRoom/UserHasRoomService';
import allowedUser from '@utils/AllowedUser';
import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';

class RoomByUserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user = await allowedUser.userGeneric(req);
    const addressees = await userService.getBy({ id: req.body.userId });

    const existRoom = await roomService.privateRoomExist(
      user.id,
      addressees.id
    );

    if (existRoom.answer) {
      const newRoom = await roomService.getBy({
        id: existRoom.room.id,
        chatHandler: { handler: true, userId: req.userId },
      });

      return res.status(200).json({
        message: 'Redirecionado para a conversa!',
        room: newRoom,
      });
    }

    let room: undefined | Room;
    await database.transaction(async (trx: EntityManager) => {
      room = await roomService.create({ type: TypeRoom.PRIVATE }, trx);
      await userHasRoomService.create({ user, room }, trx);
      await userHasRoomService.create({ user: addressees, room }, trx);
    });

    const newRoom = await roomService.getBy({
      id: (room as Room).id,
      chatHandler: { handler: true, userId: req.userId },
    });

    return res
      .status(201)
      .json({ message: 'Conversa criada com sucesso!', room: newRoom });
  }

  public async index(req: Request, res: Response): Promise<Response> {
    await allowedUser.userGeneric(req);
    const { query }: any = req;
    query.chatHandler = { handler: true, userId: req.userId };

    const rooms = await roomService.index(query);

    return res.status(200).json(rooms);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    await allowedUser.userGeneric(req);
    const { query }: any = req;
    query.chatHandler = { handler: true, userId: req.userId };

    const room = await roomService.getBy({
      id: Number(req.params.id),
      userId: req.userId,
    });

    return res.status(200).json(room);
  }
}

export default new RoomByUserController();
