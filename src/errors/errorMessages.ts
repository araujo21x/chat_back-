import userMessages from '@errors/userMessages';
import roomMessages from './roomMessages';

export default {
  INTERNAL_SERVER_ERROR: 'Erro interno no servidor.',

  TOKEN_NOT_PROVIDED: 'Token não fornecido.',
  BADLY_FORMATTED_TOKEN: 'Token está mal formatado.',
  INVALID_TOKEN: 'Token está inválido.',

  TERMS_OF_USER_NOT_FOUND: 'Termos de uso não encontrado na base de dados.',
  PRIVACY_POLICE_NOT_FOUND:
    'Politica de privacidade não encontrada na base de dados.',

  INVALID_DATE_FORMAT: 'Formato de data invalida',
  FILE_IS_MANDATORY: 'Arquivo é obrigatório.',
  USER_IS_NOT_ONLINE: 'Usuário não esta online no .',

  ...userMessages,
  ...roomMessages,
};
