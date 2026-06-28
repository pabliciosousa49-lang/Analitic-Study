import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

console.log("Chave API carregada:", process.env.GEMINI_API_KEY ? "SIM" : "NÃO");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS CORRIGIDA
// O origin deve ser apenas a URL base do seu front-end (onde o Vite/React roda)
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Corrigido para allowedHeaders
  credentials: true
}));

app.use(express.json());

// Registro das Rotas do Sistema
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/ai', aiRoutes);

// Middleware Global de Erros
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});