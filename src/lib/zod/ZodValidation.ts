import { NextFunction, Request, Response } from 'express';
import { z as zod, ZodError } from 'zod';
import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import concatenateZodErrorMessage from '@utils/concatenateZodErrorMessage';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(zod);

export type ValidationsObjectZod = {
  objectZod: zod.ZodObject<any> | zod.ZodEffects<any>;
  fieldsToTest: 'body' | 'query' | 'params';
};

class ZodValidation {
  static validate(
    objectZod: zod.ZodObject<any> | zod.ZodEffects<any>,
    fieldsToTest: 'body' | 'query' | 'params',
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      req[fieldsToTest] = objectZod.parse(req[fieldsToTest]);
    } catch (err: unknown) {
      console.log(err);
      if (!(err instanceof ZodError)) {
        throw new AppError(errorMessages.INTERNAL_SERVER_ERROR, 500);
      }

      throw new AppError(concatenateZodErrorMessage(err), 400);
    }

    return next();
  }

  static validateMultiObject(
    validations: ValidationsObjectZod[],
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      validations.forEach((element: ValidationsObjectZod) => {
        req[element.fieldsToTest] = element.objectZod.parse(
          req[element.fieldsToTest]
        );
      });
    } catch (err: unknown) {
      console.log(err);
      if (!(err instanceof ZodError)) {
        throw new AppError(errorMessages.INTERNAL_SERVER_ERROR, 500);
      }

      throw new AppError(concatenateZodErrorMessage(err), 400);
    }

    return next();
  }
}

export { ZodValidation, zod };
