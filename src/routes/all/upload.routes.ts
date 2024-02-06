import { Router } from 'express';
import multer from 'multer';

import multerConfig from '@config/multerConfig';
import authenticated from '@middlewares/authenticatedMid';
import uploadController from '@controller/genericAuth/UploadController';

const uploadRouter = Router();
uploadRouter.post(
  '/noAuth',
  multer(multerConfig).single('file'),
  uploadController.noAuth
);

uploadRouter.post(
  '/standard',
  authenticated,
  multer(multerConfig).single('file'),
  uploadController.standard
);

export default uploadRouter;
