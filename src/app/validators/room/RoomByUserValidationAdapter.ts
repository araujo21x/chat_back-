import { NextFunction, Request, Response } from 'express';
import ZodRoomByUserValidations from './ZodRoomByUserValidations';

class RoomByUserValidationAdapter {
  static index(req: Request, res: Response, next: NextFunction) {
    return ZodRoomByUserValidations.index(req, res, next);
  }

  static show(req: Request, res: Response, next: NextFunction) {
    return ZodRoomByUserValidations.show(req, res, next);
  }

  static create(req: Request, res: Response, next: NextFunction) {
    return ZodRoomByUserValidations.create(req, res, next);
  }
}

export default RoomByUserValidationAdapter;
