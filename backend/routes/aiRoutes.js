import { Router } from 'express'
import { analyzeCode, generateQuiz } from '../controllers/aiController.js'

const router = Router()

// Rota POST que o frontend vai acessar para enviar o código
router.post('/analyze', analyzeCode)

// Rota POST que o frontend vai acessar para gerar o quiz de 20 questões
router.post('/quiz', generateQuiz)

export default router