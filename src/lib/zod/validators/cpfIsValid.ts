export default function cpfIsValid(cpfWithCharacter: string): boolean {
  let cpf = cpfWithCharacter;
  cpf = cpf.replace(/[\s.-]*/gim, '');
  if (cpf.length !== 11) return false;

  for (let i = 0; i <= 9; i += 1) {
    const invalidCpf = `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`;
    if (cpf === invalidCpf) return false;
  }

  let sum = 0;
  let rest: number;

  for (let i = 1; i <= 9; i += 1) {
    sum += Number(cpf.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== Number(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i += 1) {
    sum += Number(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== Number(cpf.substring(10, 11))) return false;

  return true;
}
