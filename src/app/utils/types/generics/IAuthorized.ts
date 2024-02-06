import User from '@models/User.entity';

export default interface IAuthorized {
  token: string;
  user: User;
}
