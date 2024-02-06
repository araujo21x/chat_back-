import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';

export default function handleErrorSocket(err: any) {
  if (err instanceof AppError) {
    const { message, statusCode } = err;
    return { errors: message, status: statusCode };
  }

  return { errors: errorMessages.INTERNAL_SERVER_ERROR, status: 500 };
}
