import { Router } from 'express';
import passwordController from '@controller/genericNoAuth/PasswordController';
import PasswordValidationAdapter from '@validators/noAuthGeneric/PasswordValidationAdapter';

const noAuthPasswordRouter = Router();

noAuthPasswordRouter.post(
  '/forgot',
  PasswordValidationAdapter.forgot,
  passwordController.forgot
);

noAuthPasswordRouter.post(
  '/reset',
  PasswordValidationAdapter.reset,
  passwordController.reset
);

export default noAuthPasswordRouter;
