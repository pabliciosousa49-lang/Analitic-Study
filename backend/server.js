import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import analysisRoutes from './routes/analysisRoutes.js'
import pdfRoutes from './routes/pdfRoutes.js'
import aiRoutes from './routes/aiRoutes.js' // Importando as rotas do Gemini
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()

console.log("Chave API carregada:", process.env.GEMINI_API_KEY ? "SIM" : "NÃO");
const app = express()
const PORT = process.env.PORT || 3000

// Configuração do CORS para permitir o acesso do Frontend (Vite)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

// Registro das Rotas do Sistema
app.use('/api/auth', authRoutes)
app.use('/api/analysis', analysisRoutes)
app.use('/api/pdf', pdfRoutes)
app.use('/api/ai', aiRoutes) // Registrando a rota de integração com o Gemini

// Middleware Global de Erros (sempre por último)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Servidor CodeStudy.AI rodando na porta ${PORT}`)
})