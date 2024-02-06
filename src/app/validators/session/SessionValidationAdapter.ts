import { NextFunction, Request, Response } from 'express';
import ZodSessionValidations from './ZodSessionValidations';

class SessionValidationAdapter {
  static standardLogin(req: Request, res: Response, next: NextFunction) {
    return ZodSessionValidations.standardLogin(req, res, next);
  }
}

export default SessionValidationAdapter;
