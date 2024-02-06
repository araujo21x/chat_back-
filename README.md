
<h3 align="center">🚧 Software em construção 🚧</h3>
<p align="center">
  <img width="auto" height="23em" src="https://img.shields.io/badge/JavaScript-323330?style=flat&logo=javascript&logoColor=F7DF1E" >
  <img width="auto" height="23em" src="https://img.shields.io/badge/-TypeScript-323330?style=flat&logo=TypeScript">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Node.js-323330?style=flat&logo=Node.js&logoColor=white">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Express.js-323330?style=flate&logo=express">
  <img width="auto" height="23em" src="https://img.shields.io/badge/MySql-323330?style=flate&logo=mysql&logoColor=white">
</p>

# Sumario
- [Sumario](#sumario)
- [Sobre](#sobre)
- [Pré-Requisito](#pré-requisito)
- [Executando o projeto](#executando-o-projeto)
- [Build](#build)
- [Migrations](#migrations)
- [Documentação](#documentação)
- [Tecnologias](#tecnologias)
    - [Veja o arquivo package.json](#veja-o-arquivo-packagejson)

<br>

___
# Sobre

<br>

<p align="justify">
Em construção
</p>
<br>

---
# Pré-Requisito

<br>

  * [NojeJS](https://nodejs.org/en/) (Versão usada na construção -> 18.14.2): Runtime de JS no servidor;
  * [MySQL](https://www.mysql.com/): Banco de dados do projeto;
  * [Yarn](https://yarnpkg.com/): Gerenciador de pacote.

<br>

---
# Executando o projeto

<h2 align="center">Baixando e configurando o código <a name="downCod"></a></h2>

<br>

<strong>1 - </strong>  Clone este repositório:

HTTPS:
```bash
$ git clone
```
SSH:
```bash
$ git clone
```

<strong>2 - </strong>  Acesse a pasta do projeto no terminal/cmd:
```bash
$ cd
```

<strong>3 - </strong>  Instale as dependências do projeto:
```bash
$ yarn install
```

<strong>4 - </strong> Configurando as variáveis de ambiente (ambiente produção = .env)

1. Crie uma copia do arquivo exemple.env;

2. Modifique o nome dessa copia para .env;

3. O arquivo .env vai ter descrições de como preenchê-lo, mas para ter acesso as informações fale com o coordenador do projeto.

<h2 align="center">Executando <br> ---- Ambiente de desenvolvimento ---- <a name="execAmbDev"></a></h2>

<br>

<strong> 1 - </strong> Comando para rodar o projeto, no ambiente de desenvolvimento:
```bash
$ yarn dev
```

<br>

___
# Build


<br>

<p align="justify">
O código está em <strong>TypeScript</strong>, mas somente para o desenvolvimento. Dessa maneira será necessário fazer o <strong>build</strong> em alguns momento, por exemplo, quando for fazer deploy. Build é o processo de transforma o código de <strong>TypeScript</strong> para <strong>JavaScript</strong> e nesse projeto utilizamos o Babel. </p>
<br>

1. Buildar:
```bash
$ yarn build
```
2. Rodar o projeto <strong>JavaScript</strong> como dev/http:
```bash
$ yarn start-dev
```
3. Rodar o projeto <strong>JavaScript</strong> em produção/https:
```bash
$ yarn start-prod
```
___

# Migrations


<h2> O comando para rodar as migrations atualmente esta pegando os dados do arquivo.</h2>

<br>


1. Rodar as migrations:
```bash
$ yarn migration:run
```

1. Reverter a ultima migration:
```bash
$ yarn migration:revert
```

1. Criar uma nova migration. Em "nome da migration" coloque o nome da sua nova migration sem as aspas:
```bash
$ yarn typeorm migration:create ./src/database/migrations/"name_migration"
```

1. Criar migration no código baseado nos models/entity's do sistema. Em "nome da migration" coloque o nome da sua nova migration sem as aspas. Recomendo usar enquanto estiver em desenvolvimento, depois que já tiver em uso pelo cliente criar manualmente as migrations:
```bash
$ yarn migration:generate ./src/database/migrations/"name_migration"
```
```bash
$ yarn migration:generate ./src/database/migrations/"name_migration"
```

1. Arquivos para salvar no banco, como primeiro usuário e etc...:
```bash
$ yarn dump
```

<br>

___
# Documentação
1. Gerar schemas da request a partir do zod:
```bash
$ yarn doc:comp
```

A documentação pode ser acessar através do endPoint: <strong>/apiDocs</strong>

<br>

___
# Tecnologias

<br>

- [express](https://expressjs.com/pt-br/): Framework para NodeJS;
- [nodemon](https://nodemon.io/)(dev): Uma maneira da API atualizar sozinha sem
precisar reiniciar no ambiente de desenvolvimento;
- [babel](https://babeljs.io/)(dev): Ferramenta para transpilar o código de typeScript para javaScript;
- [zod](https://zod.dev/): Ferramenta de validação do código;
- [zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi): Ferramenta que pega os schemas do zod e converte para OpenAPI;
- [typeScript](https://www.typescriptlang.org/)(dev): Superset para JS;
- [MySQL](https://www.mysql.com/): Banco de dados do projeto;
- [TypeORM](https://typeorm.io/#/): ORM do projeto;
- [compression](https://www.npmjs.com/package/compression): Serve para comprimir
as resposta da API;
- [typeorm](https://typeorm.io/#/): ORM para NodeJS;
- [dotenv](https://www.npmjs.com/package/dotenv): Variável ambiente;
- [bcryptjs](https://www.npmjs.com/package/bcryptjs): Serviço para encriptação de senha;
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): JWT, autenticação;
- [multer](https://www.npmjs.com/package/multer): Serviço trabalhar com imagem enviado para o servidor;
- [helmet](https://www.npmjs.com/package/helmet): Ajuda na segurança da aplicação configurando o cabeçalho http da resposta da API;
- [cors](https://www.npmjs.com/package/cors): Habilitar o cors;
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): Utilizar a documentação do swagger no express;
- [aws-sdk](https://yarnpkg.com/package/aws-sdk): Funcionalidades para AWS;
- [@sendgrid/mail](https://yarnpkg.com/package/@sendgrid/mail): Funcionalidades de envio de e-mail.

### Veja o arquivo [package.json](./package.json)


