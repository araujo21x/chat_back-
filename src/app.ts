/* eslint-disable func-names */
import 'express-async-errors';
import 'dotenv/config';
import compression from 'compression';
import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import http from 'http';
import https from 'https';
import cors from 'cors';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';

import { Server } from 'socket.io';
import { authenticatedSocket } from '@middlewares/authenticatedMid';
import options from './config/optionsHttps';
import routes from './routes';
import swaggerConfig from './config/swaggerConfig';
import chatEvents from './app/socket/chat/ChatEvents';

class App {
  public app: Express;

  public server;

  public io: Server;

  constructor() {
    this.app = express();
    this.middlewares();
    this.server = new http.Server(this.app);
    if (process.env.NODE_ENV === 'prod') {
      this.server = new https.Server(options, this.app);
    }
    this.socket();
    this.routes();
    this.handleGlobalError();
  }

  private middlewares(): void {
    this.app.set('port', process.env.PORT);
    this.app.use(cors({ origin: '*' }));
    if (process.env.NODE_ENV !== 'prod') {
      this.app.use('/apiDocs', swaggerUi.serve);
      this.app.get('/apiDocs', swaggerUi.setup(swaggerJsDoc(swaggerConfig)));
    }
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
  }

  private routes() {
    this.app.use('/v1', routes);
  }

  private socket() {
    this.io = new Server(this.server, {
      cors: { origin: '*' },
    });

    this.io
      .of('/v1/chat')
      .use(authenticatedSocket)
      .on('connection', chatEvents.run());
  }

  handleGlobalError() {
    this.app.use(
      async (
        err: any,
        request: Request,
        response: Response,
        // eslint-disable-next-line no-unused-vars
        next: NextFunction
      ) => {
        if (err instanceof AppError) {
          const { message, statusCode } = err;
          return response.status(statusCode).json({ errors: message });
        }

        return response
          .status(500)
          .json({ errors: errorMessages.INTERNAL_SERVER_ERROR });
      }
    );
  }
}

export default new App().server;
