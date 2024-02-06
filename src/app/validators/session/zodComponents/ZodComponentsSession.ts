import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodSessionValidations from '../ZodSessionValidations';

class ZodComponentsSession {
  static readonly componentDefaultLogin: IComponentZod = {
    name: 'CreateLoginDefault',
    type: 'body',
    properties: ZodSessionValidations.SchemaStandardLogin,
  };

  static readonly document: IComponentDoc = {
    fileName: 'Login',
    components: [this.componentDefaultLogin],
  };
}

export default ZodComponentsSession;
