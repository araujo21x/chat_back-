import { Router } from 'express';
import authenticated from '@middlewares/authenticatedMid';
import userByUserController from '@controller/user/UserByUserController';
import UserByUserValidationAdapter from '@validators/user/UserByUserValidationAdapter';

const userByUserRouter = Router();

userByUserRouter
  .route('/')
  .get(
    authenticated,
    UserByUserValidationAdapter.index,
    userByUserController.index
  );

userByUserRouter
  .route('/:id')
  .get(
    authenticated,
    UserByUserValidationAdapter.show,
    userByUserController.show
  );

userByUserRouter
  .route('/selfie')
  .get(authenticated, userByUserController.selfShow);

export default userByUserRouter;
