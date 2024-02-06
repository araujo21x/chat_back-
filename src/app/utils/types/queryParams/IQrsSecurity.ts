import IMyQueries from './IMyQueries';

export default interface IQrsSecurity extends IMyQueries {
  id?: number;
  email?: string;
  code?: string;
  valid?: boolean;
}
