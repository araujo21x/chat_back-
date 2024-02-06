/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import 'dotenv/config';
import { Request } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import AppError from '@errors/AppError';

const tmpFolder: string = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png'];

const storageTypes = {
  local: multer.diskStorage({
    destination: tmpFolder,
    filename: (req: Request, file: any, callback: any) => {
      const fileHash = crypto.randomBytes(12).toString('hex');
      file.key = `${fileHash}-${file.originalname}`;
      return callback(null, file.key);
    },
  }),
  s3: multerS3({
    s3: new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    }),
    bucket: process.env.BUCKET_NAME as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};

export default {
  dest: tmpFolder,
  storage: storageTypes.s3,
  // limits: {
  //   fileSize: 2 * 1024 * 1024,
  // },
  fileFilter: (req: Request, file: any, cb: any) => {
    if (!allowedMimes.includes(file.mimetype)) {
      return cb(new AppError('Tipo de arquivo invalido!', 400));
    }
    cb(null, true);
  },
};
