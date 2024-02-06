import { Router } from 'express';
import authenticated from '@middlewares/authenticatedMid';
import RoomByUserValidationAdapter from '@validators/room/RoomByUserValidationAdapter';
import roomByUserController from '@controller/room/RoomByUserController';

const rootByUserRouter = Router();

rootByUserRouter
  .route('/')
  .all(authenticated)
  .get(RoomByUserValidationAdapter.index, roomByUserController.index)
  .post(RoomByUserValidationAdapter.create, roomByUserController.create);

rootByUserRouter
  .route('/:id')
  .all(authenticated)
  .get(RoomByUserValidationAdapter.show, roomByUserController.show);

export default rootByUserRouter;
