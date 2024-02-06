import { zod } from '@lib/zod/ZodValidation';
import ZodPasswordValidations from '@validators/noAuthGeneric/ZodPasswordValidations';

const schema = zod.object(ZodPasswordValidations.SchemaReset);
type IResetPassword = zod.infer<typeof schema>;

export default IResetPassword;
