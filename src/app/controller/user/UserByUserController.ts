import { Request, Response } from 'express';

import allowedUser from '@utils/AllowedUser';
import userService from '@services/user/UserService';

class UserByAdminController {
  public async selfShow(req: Request, res: Response): Promise<Response> {
    const user = await allowedUser.userGeneric(req);

    return res.status(200).json(user);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    await allowedUser.userGeneric(req);

    const user = await userService.getBy({ id: Number(req.params.id) });

    return res.status(200).json(user);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    await allowedUser.userGeneric(req);

    const users = await userService.index({ ...req.query, notId: req.userId });

    return res.status(200).json(users);
  }
}

export default new UserByAdminController();
