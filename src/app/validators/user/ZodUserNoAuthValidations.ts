import { emailMsg } from '@lib/zod/zodMessages';
import ZodGenericValidation from '@lib/zod/ZodSchemaGeneric';
import { ZodValidation, zod } from '@lib/zod/ZodValidation';
import { NextFunction, Request, Response } from 'express';

class ZodUserNoAuthValidations {
  static readonly schemaCreate = {
    name: ZodGenericValidation.string('Nome'),
    email: ZodGenericValidation.string('Email').email(emailMsg('Email')),
    password: ZodGenericValidation.password,
  };

  static create(req: Request, res: Response, next: NextFunction) {
    ZodValidation.validate(
      zod.object(this.schemaCreate).transform((body) => {
        const newData: any = {};

        if (req.file) {
          newData.imageKey = req.file.key;
          newData.image = req.file.location;
        }

        return {
          ...body,
          ...newData,
        };
      }),
      'body',
      req,
      res,
      next
    );
  }
}

export default ZodUserNoAuthValidations;
