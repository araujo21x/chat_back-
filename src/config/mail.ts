import 'dotenv/config';

export default {
  host: process.env.SMTP_HOST as string,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_AUTH_USER as string,
    pass: process.env.SMTP_AUTH_PASS as string,
  },
  default: {
    from: `Equipe chat_back <${process.env.EMAIL_CLIENT as string}>`,
  },
};
