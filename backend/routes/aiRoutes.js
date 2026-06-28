import express from 'express';
import { analyzeCode, generateQuiz } from '../controllers/aiController.js';

const router = express.Router();

router.post('/analyze', analyzeCode);
router.post('/quiz', generateQuiz);

export default router;