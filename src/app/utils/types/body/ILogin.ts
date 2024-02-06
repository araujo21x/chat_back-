import { zod } from '@lib/zod/ZodValidation';
import ZodSessionValidations from '@validators/session/ZodSessionValidations';

const schema = zod.object(ZodSessionValidations.SchemaStandardLogin);
type ILogin = zod.infer<typeof schema>;

export default ILogin;
