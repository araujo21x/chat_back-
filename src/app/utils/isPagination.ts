import IPagination from '@myTypes/generics/IPagination';
import User from '@models/User.entity';
import { SelectQueryBuilder } from 'typeorm';
import IMyQueries from './types/queryParams/IMyQueries';

export default function isPagination(query: IMyQueries): IPagination {
  if (query.paginate === 'not') return {};

  const { limit = 10, page = 1 } = query;
  const pagination: IPagination = {};

  pagination.take = Number(limit);
  pagination.skip = (Number(page) - 1) * Number(limit);

  return pagination;
}

export function isPaginationQueryBuild(
  queries: IMyQueries,
  query: SelectQueryBuilder<any>
): SelectQueryBuilder<User> {
  if (queries.paginate === 'not') return query;

  const { limit = 10, page = 1 } = queries;

  query.take(Number(limit));
  query.skip((Number(page) - 1) * Number(limit));

  return query;
}
