import { NextFunction, Request, Response } from 'express';
import ZodPasswordValidations from './ZodPasswordValidations';

class PasswordValidationAdapter {
  static forgot(req: Request, res: Response, next: NextFunction) {
    return ZodPasswordValidations.forgot(req, res, next);
  }

  static reset(req: Request, res: Response, next: NextFunction) {
    return ZodPasswordValidations.reset(req, res, next);
  }
}

export default PasswordValidationAdapter;
