import { Router } from 'express';
import userByUserRouter from './userByUser.routes';
import rootByUserRouter from './rootByUser.routes';

const userRouter = Router();

userRouter.use('/user', userByUserRouter);
userRouter.use('/room', rootByUserRouter);

export default userRouter;
