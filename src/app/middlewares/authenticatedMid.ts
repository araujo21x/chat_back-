/* eslint-disable consistent-return */
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import auth from '@config/auth';
import { Socket } from 'socket.io';
import chatService from '../socket/chat/ChatService';

export interface ITokenPayload {
  userId: number;
}

async function authenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) throw new AppError(errorMessages.TOKEN_NOT_PROVIDED, 401);

  const [, token] = authToken.split(' ');

  if (!token) throw new AppError(errorMessages.BADLY_FORMATTED_TOKEN, 401);

  try {
    const data: string | jwt.JwtPayload = jwt.verify(token, auth.secret);
    const { userId } = data as ITokenPayload;

    req.userId = Number(userId);

    return next();
  } catch (error) {
    throw new AppError(errorMessages.INVALID_TOKEN, 401);
  }
}

async function authenticatedSocket(socket: Socket, next: any) {
  try {
    const authToken = socket.handshake.headers.authorization;

    if (!authToken) throw new Error(errorMessages.TOKEN_NOT_PROVIDED);

    const [, token] = authToken.split(' ');

    if (!token) throw new Error(errorMessages.BADLY_FORMATTED_TOKEN);

    const data: string | jwt.JwtPayload = jwt.verify(token, auth.secret);
    const { userId } = data as ITokenPayload;

    chatService.setOnlineUsers(userId, socket.id);

    next();
  } catch (error: any) {
    next(new Error(error.message));
  }
}

export { authenticatedSocket };
export default authenticated;
