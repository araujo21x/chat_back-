import cnpjIsValid from './validators/cnpjIsValid';
import cpfCnpjIsValid from './validators/cpfCnpjIsValid';
import cpfIsValid from './validators/cpfIsValid';
import plateIsValid from './validators/plateIsValid';
import {
  maxMsg,
  minMsg,
  numberIntMsg,
  numberMsg,
  numberPositiveMsg,
  stringMsg,
  dateMsg,
} from './zodMessages';
import { zod } from './ZodValidation';

class ZodGenericValidation {
  static string(field: string, min: number = 1, max: number = 255) {
    return zod
      .string(stringMsg(field))
      .trim()
      .min(min, minMsg(field, min))
      .max(max, maxMsg(field, max));
  }

  static stringOptional(field: string, max: number = 255) {
    return zod
      .string(stringMsg(field))
      .trim()
      .max(max, maxMsg(field, max))
      .optional()
      .nullable();
  }

  static numeric(field: string) {
    return zod
      .number(numberMsg(field))
      .int(numberIntMsg(field))
      .nonnegative(numberPositiveMsg(field));
  }

  static numericOptional(field: string) {
    return zod
      .number(numberMsg(field))
      .int(numberIntMsg(field))
      .nonnegative(numberPositiveMsg(field))
      .optional()
      .nullable();
  }

  static decimal(field: string) {
    return zod
      .number(numberMsg(field))
      .nonnegative(numberPositiveMsg(field))
      .max(9999999999, maxMsg(field, 9999999999));
  }

  static decimalOptional(field: string) {
    return zod
      .number(numberMsg(field))
      .nonnegative(numberPositiveMsg(field))
      .max(9999999999, maxMsg(field, 9999999999))
      .optional()
      .nullable();
  }

  static numberIsString(field: string) {
    return zod
      .string(stringMsg(field))
      .trim()
      .regex(/^\d+$/, `${field} precisa ser um número`);
  }

  static numberIsStringOptional(field: string) {
    return zod
      .string(stringMsg(field))
      .trim()
      .regex(/^\d+$/, `${field} precisa ser um número`)
      .optional()
      .nullable();
  }

  static cpf = this.string('CPF', 11, 16).refine((val) => cpfIsValid(val), {
    message: `CPF invalido`,
  });

  static cnpj = this.string('CNPJ', 14, 18).refine((val) => cnpjIsValid(val), {
    message: `CNPJ invalido`,
  });

  static cpfCnpj = this.string('CNPJ ou CPF', 11, 18)
    .openapi({ example: '12345678912' })
    .refine((val) => cpfCnpjIsValid(val), {
      message: `CNPJ ou CPF invalido`,
    });

  static password = this.string('Senha', 8, 255);
  // .refine((data) => {
  //   let isValid = true;

  //   if (!/^(?=.*[a-z])/.test(data)) isValid = false;
  //   if (!/^(?=.*[A-Z])/.test(data)) isValid = false;
  //   if (!/^(?=.*[0-9])/.test(data)) isValid = false;

  //   return isValid;
  // }, 'Senha invalida! É necessário letras minúsculas, números e pelo menos uma letra maiúscula');

  static phone = this.string('Telefone', 11, 11).regex(/\d{11}/g);

  static birthDay(ageMin: number = 18) {
    return zod.coerce
      .date(dateMsg('data de nascimento'))
      .refine((val) => {
        const date = new Date(val);
        date.setHours(val.getHours() + 3);

        date.setFullYear(date.getFullYear() + ageMin);
        if (date.getTime() >= new Date().getTime()) return false;
        return true;
      }, `Você precisa ter mais de ${ageMin}`)
      .openapi({
        description:
          'Qualquer formato de data que esteja em ano,mes e dia, exemplo: "2022-01-12T00:00:00.000Z", 2022-01-12 e etc...',
        example: '2000-01-01',
      });
  }

  static plate = this.string('placa', 7, 13)
    .openapi({ example: 'abc12345' })
    .refine((val) => plateIsValid(val), {
      message: `Placa invalida`,
    });

  static paginate = zod.enum(['yes', 'not']).optional().nullable().openapi({
    example: 'yes',
    description: 'yes para paginar e not para não paginar e vir todos os itens',
  });
}

export default ZodGenericValidation;
