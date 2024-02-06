import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodUserNoAuthValidations from '../ZodUserNoAuthValidations';

class ZodComponentsUserNoAuth {
  static readonly componentCreate: IComponentZod = {
    name: 'createUserNoAuth',
    type: 'body',
    properties: ZodUserNoAuthValidations.schemaCreate,
  };

  static readonly document: IComponentDoc = {
    fileName: 'userNoAuth',
    components: [this.componentCreate],
  };
}

export default ZodComponentsUserNoAuth;
