import { Router } from 'express';

import noAuthPasswordRouter from './noAuthPassword.routes';
import noAuthUserRouter from '../user/noAuthUser.routes';

const noAuthRouter = Router();

noAuthRouter.use('/password', noAuthPasswordRouter);
noAuthRouter.use('/user', noAuthUserRouter);

export default noAuthRouter;
