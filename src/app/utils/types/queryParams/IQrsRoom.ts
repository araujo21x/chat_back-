import IChatHandler from '@myTypes/IChatHandler';
import IMyQueries from './IMyQueries';

export default interface IQrsRoom extends IMyQueries {
  id?: number;
  notId?: number;
  name?: string;
  type?: string;
  userId?: number;
  usersIds?: number[];
  chatHandler?: IChatHandler;
}
