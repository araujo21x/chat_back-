import User from '@models/User.entity';
import { FindOptionsRelations } from 'typeorm';

export type IRelationUserKey = 'basic';

interface IRelation {
  basic: FindOptionsRelations<User>;
  default: FindOptionsRelations<User>;
}

class RelationsUser {
  static readonly relations: IRelation = {
    basic: {},
    default: {},
  };
}

export default RelationsUser;
