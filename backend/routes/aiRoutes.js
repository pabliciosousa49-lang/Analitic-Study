import { Router } from 'express';
import { analyzeCode, generateQuiz } from '../controllers/aiController.js'; // Garanta que generateQuiz esteja importado
import { edit_autenticacao } from '../middlewares/authMiddleware.js'; // Se você usar o middleware de JWT

const router = Router();

// Rota da análise que você já usa
router.post('/analyze', analyzeCode);

// NOVA ROTA: Gerador de Quiz (Recomendo proteger com seu middleware de autenticação se já tiver ativo)
router.post('/generate-quiz', generateQuiz);

export default router;