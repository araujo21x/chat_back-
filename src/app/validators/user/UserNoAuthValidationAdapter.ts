import { NextFunction, Request, Response } from 'express';
import ZodUserNoAuthValidations from './ZodUserNoAuthValidations';

class UserNoAuthValidationAdapter {
  static create(req: Request, res: Response, next: NextFunction) {
    return ZodUserNoAuthValidations.create(req, res, next);
  }
}

export default UserNoAuthValidationAdapter;
