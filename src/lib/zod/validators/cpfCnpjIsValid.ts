import cnpjIsValid from './cnpjIsValid';
import cpfIsValid from './cpfIsValid';

export default function cpfCnpjIsValid(cpfCnpjWithCharacter: string): boolean {
  let cpfCnpj = cpfCnpjWithCharacter;
  cpfCnpj = cpfCnpj.replace(/[^\d]+/g, '');
  if (cpfCnpj.length > 11) return cnpjIsValid(cpfCnpj);
  return cpfIsValid(cpfCnpj);
}
