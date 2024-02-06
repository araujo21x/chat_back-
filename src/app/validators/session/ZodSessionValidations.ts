import { emailMsg } from '@lib/zod/zodMessages';
import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import { ZodValidation, zod } from '@lib/zod/ZodValidation';
import { NextFunction, Request, Response } from 'express';

class ZodSessionValidations {
  static SchemaStandardLogin = {
    email: ZodGenericValidation.string('email').email(emailMsg('email')),
    password: ZodGenericValidation.password,
  };

  static standardLogin(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.SchemaStandardLogin),
      'body',
      req,
      res,
      next
    );
  }
}

export default ZodSessionValidations;
