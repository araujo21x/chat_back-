import { Request, Response } from 'express';

import Mail from '@lib/Mail';
import Status from '@myTypes/enums/Status';
import passwordService from '@services/genericNoAuth/PasswordService';
import userService from '@services/user/UserService';
import getEmailBody from '@utils/getEmailBody';

class PasswordController {
  public async forgot(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    await userService.getBy({ email, status: Status.ACTIVE });
    const code = await passwordService.forgot(email);

    await Mail.sendMail(
      getEmailBody(
        email,
        {
          recoveryPasswordCode: `${process.env.FRONT_URL}/recoveryPassword?type=reset&token=${code}`,
        },
        'forgotPassword'
      )
    );

    return res.status(200).json({
      message: 'O código de recuperação de senha foi enviado para seu E-mail.',
    });
  }

  public async reset(req: Request, res: Response): Promise<Response> {
    const user = await passwordService.getUserByCodeReset(req.body.code);
    passwordService.resetTokenIsValid(user.passwordResetExpires);
    await passwordService.reset(user.id, req.body.password);

    return res.status(200).json({ message: 'Senha atualizada com sucesso!' });
  }
}

export default new PasswordController();
