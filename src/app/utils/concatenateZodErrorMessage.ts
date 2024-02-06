import { ZodError, ZodIssueOptionalMessage } from 'zod';

export default function concatenateZodErrorMessage(err: ZodError): string {
  let message = '';

  err.issues.forEach((element: ZodIssueOptionalMessage, index: number) => {
    if (index + 1 === err.issues.length) {
      if (index === 0) {
        message = `${element.message}`;
      } else {
        message = `${message} ${element.message}`;
      }
    } else if (index === 0) {
      message = `${element.message} --`;
    } else {
      message = `${message} ${element.message} --`;
    }
  });

  return message;
}
