import { Router } from 'express';

import noAuthRouter from './all/noAuth.routes';
import sessionsRouter from './all/sessions.routes';
import uploadRouter from './all/upload.routes';
import userRouter from './user/user.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/noAuth', noAuthRouter);
routes.use('/user', userRouter);
routes.use('/upload', uploadRouter);

export default routes;
