import { emailMsg } from '@lib/zod/zodMessages';
import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import { ZodValidation, zod } from '@lib/zod/ZodValidation';
import { NextFunction, Request, Response } from 'express';

class ZodUserByUserValidations {
  static readonly schemaIndex = {
    name: ZodGenericValidation.stringOptional('nome'),
    paginate: zod.enum(['yes', 'not']).optional().nullable(),
    limit: ZodGenericValidation.numberIsStringOptional('limite'),
    page: ZodGenericValidation.numberIsStringOptional('pagina'),
  };

  static readonly schemaShow = {
    id: ZodGenericValidation.numberIsString('identificador'),
  };

  static readonly schemaEditSelf = {
    name: ZodGenericValidation.stringOptional('nome'),
    email: ZodGenericValidation.string('email')
      .email(emailMsg('email'))
      .nullable()
      .optional(),
    password: ZodGenericValidation.password.nullable().optional(),
    confirmPassword: ZodGenericValidation.password.nullable().optional(),
    image: ZodGenericValidation.stringOptional('imagem', 1500),
    imageKey: ZodGenericValidation.stringOptional('imagemKey', 1500),
  };

  static index(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.schemaIndex),
      'query',
      req,
      res,
      next
    );
  }

  static show(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.schemaShow),
      'params',
      req,
      res,
      next
    );
  }

  static editSelf(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.schemaEditSelf).refine((date) => {
        if (date.password) {
          if (date.password !== date.confirmPassword) return false;
        }

        return true;
      }, 'Senhas não conferem'),
      'body',
      req,
      res,
      next
    );
  }
}

export default ZodUserByUserValidations;
