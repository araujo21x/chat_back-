import User from '@models/User.entity';

export default interface IUserList {
  users: User[];
  countUsers: number;
}
