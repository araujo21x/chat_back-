import IMyQueries from './IMyQueries';
import IQrsRoom from './IQrsRoom';
import IQrsUser from './IQrsUser';

export default interface IQrsMessage extends IMyQueries {
  id?: number;
  notId?: number;
  sender?: IQrsUser;
  room?: IQrsRoom;
}
