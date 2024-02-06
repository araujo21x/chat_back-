import bcrypt from 'bcryptjs';

export default (password: string): string => {
  return bcrypt.hashSync(password, 10);
};
