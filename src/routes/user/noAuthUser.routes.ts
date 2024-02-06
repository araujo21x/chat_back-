import { Router } from 'express';
import multer from 'multer';
import multerConfig from '@config/multerConfig';
import UserNoAuthValidationAdapter from '@validators/user/UserNoAuthValidationAdapter';
import userNoAuthController from '@controller/user/UserNoAuthController';

const noAuthUserRouter = Router();

noAuthUserRouter.post(
  '/',
  multer(multerConfig).single('file'),
  UserNoAuthValidationAdapter.create,
  userNoAuthController.create
);

export default noAuthUserRouter;
