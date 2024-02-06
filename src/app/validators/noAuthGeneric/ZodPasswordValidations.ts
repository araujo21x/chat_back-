import { emailMsg } from '@lib/zod/zodMessages';
import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import { ZodValidation, zod } from '@lib/zod/ZodValidation';
import { NextFunction, Request, Response } from 'express';

class ZodPasswordValidations {
  static SchemaForgot = {
    email: ZodGenericValidation.string('email').email(emailMsg('email')),
  };

  static SchemaReset = {
    code: ZodGenericValidation.string('Código', 6, 6),
    password: ZodGenericValidation.password,
    // confirmPassword: ZodGenericValidation.password,
  };

  static forgot(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.SchemaForgot),
      'body',
      req,
      res,
      next
    );
  }

  static reset(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.SchemaReset),
      // .refine((data) => data.confirmPassword === data.password, {
      //   message: 'Senhas informadas são diferentes.',
      // }),
      'body',
      req,
      res,
      next
    );
  }
}

export default ZodPasswordValidations;
