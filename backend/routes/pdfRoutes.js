// Rotas de PDF do CodeStudy AI.
import express from 'express'
import pdfController from '../controllers/pdfController.js'

const router = express.Router()

// Rota ajustada para receber o :id que o controller precisa
router.post('/generate/:id', pdfController.generatePdf)

// Exportação padrão moderna
export default router