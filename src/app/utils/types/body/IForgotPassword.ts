import { zod } from '@lib/zod/ZodValidation';
import ZodPasswordValidations from '@validators/noAuthGeneric/ZodPasswordValidations';

const schema = zod.object(ZodPasswordValidations.SchemaForgot);
type IForgotPassword = zod.infer<typeof schema>;

export default IForgotPassword;
