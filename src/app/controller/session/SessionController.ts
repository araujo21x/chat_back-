import IAuthorized from '@myTypes/generics/IAuthorized';
import sessionService from '@services/session/SessionService';
import { Request, Response } from 'express';

class SessionController {
  public async standard(req: Request, res: Response): Promise<Response> {
    const authorized: IAuthorized = await sessionService.standardLogin(
      req.body
    );

    return res.status(200).json(authorized);
  }
}

export default new SessionController();
