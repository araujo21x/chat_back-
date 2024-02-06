import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';
import { Request, Response } from 'express';

class UploadController {
  public async standard(req: Request, res: Response): Promise<Response> {
    if (!req.file) throw new AppError(errorMessages.FILE_IS_MANDATORY);

    return res.status(200).json({
      file: req.file.location,
      fileKey: req.file.key,
      name: req.file.originalname,
    });
  }

  public async noAuth(req: Request, res: Response): Promise<Response> {
    if (!req.file) throw new AppError(errorMessages.FILE_IS_MANDATORY, 400);
    if (req.body.code !== process.env.UPLOAD_NO_AUTH) {
      throw new AppError('Código de upload invalido', 400);
    }

    return res.status(200).json({
      file: req.file.location,
      fileKey: req.file.key,
      name: req.file.originalname,
    });
  }
}

export default new UploadController();
