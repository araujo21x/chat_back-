import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import { ZodValidation, zod } from '@lib/zod/ZodValidation';
import TypeRoom from '@myTypes/enums/TypeRoom';
import { NextFunction, Request, Response } from 'express';

class ZodRoomByUserValidations {
  static readonly schemaIndex = {
    name: ZodGenericValidation.stringOptional('nome'),
    type: zod.enum([TypeRoom.GROUP, TypeRoom.PRIVATE]).optional().nullable(),
    paginate: zod.enum(['yes', 'not']).optional().nullable(),
    limit: ZodGenericValidation.numberIsStringOptional('limite'),
    page: ZodGenericValidation.numberIsStringOptional('pagina'),
  };

  static readonly schemaShow = {
    id: ZodGenericValidation.numberIsString('identificador'),
  };

  static readonly schemaCreate = {
    userId: ZodGenericValidation.numeric('identificador do usuário'),
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

  static create(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.schemaCreate),
      'body',
      req,
      res,
      next
    );
  }
}

export default ZodRoomByUserValidations;
