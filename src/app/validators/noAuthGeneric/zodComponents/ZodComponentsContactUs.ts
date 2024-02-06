import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';
import ZodContactUsValidations from '../ZodContactUsValidations';

class ZodComponentsContactUs {
  static readonly componentSend: IComponentZod = {
    name: 'Send',
    type: 'body',
    properties: ZodContactUsValidations.SchemaSend,
  };

  static readonly document: IComponentDoc = {
    fileName: 'ContactUsNoAuth',
    components: [this.componentSend],
  };
}

export default ZodComponentsContactUs;
