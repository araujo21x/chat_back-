export default function cnpjIsValid(cnpjWithCharacter: string): boolean {
  let cnpj = cnpjWithCharacter;
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj === '') return false;

  if (cnpj.length !== 14) return false;

  for (let i = 0; i <= 9; i += 1) {
    const invalidCnpj = `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`;
    if (cnpj === invalidCnpj) return false;
  }

  const sequenceDigit1: number[] = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sequenceDigit2: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  let rest: number;

  // digito1
  for (let i = 0; i <= 11; i += 1) {
    sum += Number(cnpj[i]) * sequenceDigit1[i];
  }

  rest = sum % 11;
  rest = rest < 2 ? 0 : 11 - rest;
  if (rest !== Number(cnpj[12])) return false;

  // digito2
  sum = 0;
  rest = 0;
  for (let i = 0; i <= 12; i += 1) {
    sum += Number(cnpj[i]) * sequenceDigit2[i];
  }

  rest = sum % 11;
  rest = rest < 2 ? 0 : 11 - rest;
  if (rest !== Number(cnpj[13])) return false;

  return true;
}
