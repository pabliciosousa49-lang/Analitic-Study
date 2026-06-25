import { Router } from 'express';
import { analyzeCode, generateQuiz } from '../controllers/aiController.js';

const router = Router();

// Rota de análise original
router.post('/analyze', analyzeCode);

// Rota do quiz integrada
router.post('/generate-quiz', generateQuiz);

export default router;