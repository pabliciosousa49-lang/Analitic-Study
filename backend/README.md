# CodeStudy AI Backend

Backend completo em Node.js, Express, Prisma, SQLite e PDFKit para receber codigo-fonte, gerar uma analise simulada, salvar no banco e exportar a analise em PDF.

## Estrutura

```txt
backend/
├── controllers/   # Recebe requisicoes HTTP e chama os services
├── routes/        # Define as rotas da API
├── services/      # Contem regras de negocio, Prisma e PDFKit
├── prisma/        # Schema e migrations do Prisma
├── middlewares/   # Tratamento global de erros
├── utils/         # Utilitarios compartilhados
└── server.js      # Entrada da app Express
```

## Instalação

```bash
cd backend
npm install
copy .env.example .env
```

No Linux/macOS, use:

```bash
cp .env.example .env
```

## Migração do banco

```bash
npm run prisma:migrate
```

## Executar

```bash
npm run dev
```

Ou em modo normal:

```bash
npm start
```

## Rotas

### POST `/api/analyze`

Recebe codigo e linguagem, gera uma analise mockada e salva no SQLite.

```json
{
  "language": "JavaScript",
  "code": "function soma(a, b) { return a + b; }"
}
```

### GET `/api/analyses`

Lista todas as analises salvas.

### GET `/api/analyses/:id`

Busca uma analise por ID.

### POST `/api/pdf/:id`

Gera e baixa um PDF da analise.

## Observações

- Nao usa OpenAI.
- Nao usa API paga.
- Nao implementa autenticacao, JWT ou cadastro de usuarios.
