// Rotas de analise do CodeStudy AI.
import express from 'express'
import analysisController from '../controllers/analysisController.js'

const router = express.Router()

router.post('/analyze', analysisController.analyzeCode)
router.get('/analyses', analysisController.listAnalyses)
router.get('/analyses/:id', analysisController.getAnalysis)

// Exportação padrão moderna
export default router