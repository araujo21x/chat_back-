export function emailMsg(field: string) {
  return `Campo ${field} é um email invalido`;
}

export function maxMsg(field: string, number: number) {
  return `Campo ${field} pode ter no máximo ${number} caractere`;
}

export function minMsg(field: string, number: number) {
  return `Campo ${field} pode ter no mínimo ${number} caractere`;
}

export function stringMsg(field: string) {
  return {
    required_error: `Campo ${field} é obrigatório`,
    invalid_type_error: `Campo ${field} está com formato errado, formato certo é texto(string)`,
  };
}

export function numberMsg(field: string) {
  return {
    required_error: `${field} é obrigatório`,
    invalid_type_error: `Tipo de ${field} não é numero`,
  };
}

export function numberIntMsg(field: string) {
  return `Campo ${field} precisa ser um numero inteiro`;
}

export function numberPositiveMsg(field: string) {
  return `Campo ${field} precisa ser um numero positivo`;
}

export function dateMsg(field: string) {
  return {
    required_error: `${field} é obrigatório`,
    invalid_type_error: `Tipo de ${field} não é data`,
  };
}
