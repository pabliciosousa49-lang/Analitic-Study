import { Router } from 'express'
import { analyzeCode } from '../controllers/aiController.js'

const router = Router()

// Rota POST que o frontend vai acessar para enviar o código
router.post('/analyze', analyzeCode)

export default router