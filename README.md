# Smart To-Do

[![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![Package License](https://img.shields.io/npm/l/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![NPM Downloads](https://img.shields.io/npm/dm/@nestjs/common.svg)](https://www.npmjs.com/~nestjscore)
[![CircleCI](https://img.shields.io/circleci/build/github/nestjs/nest/master)](https://circleci.com/gh/nestjs/nest)
[![Discord](https://img.shields.io/badge/discord-online-brightgreen.svg)](https://discord.gg/G7Qnnhy)

## Descrição

Smart To-Do é uma API RESTful para gerenciamento de tarefas, construída com [NestJS](https://nestjs.com/) e TypeScript. O projeto demonstra boas práticas de arquitetura, autenticação via API Key, validação de dados, tratamento global de exceções e testes automatizados.

## Funcionalidades

- CRUD de tarefas (Create, Read, Update, Delete)
- Filtro de tarefas por status (concluída ou não)
- Middleware de autenticação por API Key
- Validação de dados com class-validator
- Tratamento global de exceções
- Testes unitários e e2e

## Estrutura do Projeto

```text
smart-to-do/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── auth/
│   │   ├── auth.middleware.ts
│   │   └── auth.middleware.spec.ts
│   ├── common/
│   │   └── filters/
│   │       └── http-exception.filter.ts
│   └── tasks/
│       ├── tasks.controller.ts
│       ├── tasks.controller.spec.ts
│       ├── tasks.module.ts
│       ├── tasks.service.ts
│       ├── tasks.service.spec.ts
│       ├── dto/
│       │   ├── create-task.dto.ts
│       │   ├── get-task.dto.ts
│       │   └── update-task.dto.ts
│       └── entities/
│           └── task.entity.ts
├── test/
│   └── app.e2e-spec.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── nest-cli.json
└── README.md
```

## Instalação

```bash
npm install
```

## Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
API_KEY=123456
```

## Executando a Aplicação

### Desenvolvimento

```bash
npm run start:dev
```

### Produção

```bash
npm run build
npm run start:prod
```

A aplicação estará disponível em `http://localhost:3000`.

## Autenticação

Todas as rotas de `/tasks` exigem o header `x-api-key` com o valor definido em `.env`.

Exemplo de requisição:

```bash
curl -H "x-api-key: 123456" http://localhost:3000/tasks
```

## Endpoints

### GET /tasks

Lista todas as tarefas. Aceita filtro por status:

```bash
GET /tasks?done=true
```

### GET /tasks/:id

Retorna uma tarefa pelo ID.

### POST /tasks

Cria uma nova tarefa.

Body:

```json
{
  "title": "Comprar pão",
  "description": "Integral",
  "done": false
}
```

### PATCH /tasks/:id

Atualiza uma tarefa.

Body (parcial ou total):

```json
{
  "done": true
}
```

### DELETE /tasks/:id

Remove uma tarefa.

## Validação e Tratamento de Erros

- Todos os DTOs usam decorators do `class-validator`.
- Erros são tratados globalmente pelo filtro `AllExceptionsFilter`.

## Testes

- Testes unitários: `npm run test`
- Testes e2e: `npm run test:e2e`
- Cobertura: `npm run test:cov`

## Padrão de Código

- Lint: `npm run lint`
- Format: `npm run format`
- Configuração Prettier e ESLint incluídas.

## Recursos

- [NestJS Documentation](https://docs.nestjs.com)
- [Discord NestJS](https://discord.gg/G7Qnnhy)

## Licença

MIT
