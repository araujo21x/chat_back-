import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodPasswordValidations from '../ZodPasswordValidations';

class ZodComponentsPassword {
  static readonly componentForgot: IComponentZod = {
    name: 'ForgotPassword',
    type: 'body',
    properties: ZodPasswordValidations.SchemaForgot,
  };

  static readonly componentReset: IComponentZod = {
    name: 'ResetPassword',
    type: 'body',
    properties: ZodPasswordValidations.SchemaReset,
  };

  static readonly document: IComponentDoc = {
    fileName: 'PasswordNoAuth',
    components: [this.componentForgot, this.componentReset],
  };
}

export default ZodComponentsPassword;
