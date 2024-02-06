import { Socket } from 'socket.io';
import IChatDTO from '@myTypes/body/IChatDTO';
import roomService from '@services/room/RoomService';
import TypeRoom from '@myTypes/enums/TypeRoom';
import messageService from '@services/message/MessageService';
import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import chatService from './ChatService';

class ChatController {
  public logout(socket: Socket) {
    const isOnline = chatService.getKeyBy({ value: socket.id });

    if (!isOnline) return;
    chatService.deleteById(isOnline);
  }

  public async sendMsg(socket: Socket, data: IChatDTO): Promise<void> {
    const senderId = chatService.getKeyBy({ value: socket.id });
    if (!senderId) throw new AppError(errorMessages.USER_IS_NOT_ONLINE, 403);

    const room = await roomService.getBy({
      id: data.roomId,
      type: TypeRoom.PRIVATE,
    });

    const sender = roomService.getUserRoom(room, senderId);
    roomService.getUserRoom(room, data.addresseeId);

    const message = await messageService.create({
      content: data.content,
      sender,
      room,
    });

    socket.emit('msgReceived', { message });

    const addresseeSocketId = chatService.findBy({ id: data.addresseeId });
    if (!addresseeSocketId) return;

    socket.to(addresseeSocketId).emit('msgArrived', { message });
  }
}

export default new ChatController();
