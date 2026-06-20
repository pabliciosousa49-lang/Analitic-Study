// Rotas de analise do CodeStudy AI.

const express = require('express');
const analysisController = require('../controllers/analysisController');

const router = express.Router();

router.post('/analyze', analysisController.analyzeCode);
router.get('/analyses', analysisController.listAnalyses);
router.get('/analyses/:id', analysisController.getAnalysis);

module.exports = router;
