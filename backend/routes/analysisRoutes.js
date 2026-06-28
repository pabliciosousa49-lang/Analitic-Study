import express from 'express';
import * as analysisController from '../controllers/analysisController.js';

const router = express.Router();

// Rotas mantidas e consistentes com o Controller
router.post('/analyze', analysisController.analyzeCode);
router.get('/analyses', analysisController.listAnalyses);

// Nota: A rota '/analyses/:id' que chamava generatePdf foi removida 
// pois a funcionalidade não é mais necessária.

export default router;