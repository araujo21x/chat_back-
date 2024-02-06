import 'dotenv/config';

export default {
  secret: process.env.SECRET_JWT as string,
  secretRefresh: process.env.SECRET_REFRESH_TOKEN as string,
};
