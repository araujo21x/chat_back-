import { Router } from 'express';
import sessionController from '@controller/session/SessionController';
import SessionValidationAdapter from '@validators/session/SessionValidationAdapter';

const sessionsRouter = Router();

sessionsRouter.post(
  '/standard',
  SessionValidationAdapter.standardLogin,
  sessionController.standard
);

export default sessionsRouter;
