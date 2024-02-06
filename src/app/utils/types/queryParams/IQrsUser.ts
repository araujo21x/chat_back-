import IMyQueries from './IMyQueries';

export default interface IQrsUser extends IMyQueries {
  id?: number;
  notId?: number;
  name?: string;
  email?: string;
  types?: string[];
  type?: string;
  status?: string;
  passwordResetToken?: string;
}
