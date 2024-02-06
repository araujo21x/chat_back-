import { Request, Response } from 'express';

import userService from '@services/user/UserService';

class UserNoAuthController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { email } = body;

    await userService.existInDb({ email });
    await userService.create(body);

    return res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
  }
}

export default new UserNoAuthController();
