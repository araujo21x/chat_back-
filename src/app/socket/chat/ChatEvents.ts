import { Socket } from 'socket.io';

import chatController from './ChatController';
import handleErrorSocket from '../utils/handleErrorSocket';

class ChatEvents {
  public run() {
    return (socket: Socket) => {
      socket.on('sendMsg', async (data) => {
        try {
          await chatController.sendMsg(socket, data);
        } catch (err) {
          socket.to(socket.id).emit('errorSocket', handleErrorSocket(err));
        }
      });

      socket.on('disconnect', () => chatController.logout(socket));
    };
  }
}

export default new ChatEvents();
