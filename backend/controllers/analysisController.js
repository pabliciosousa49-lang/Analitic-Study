// Controller HTTP das analises. Recebe request/response e delega regras para services.

const analysisService = require('../services/analysisService');

async function analyzeCode(req, res, next) {
  try {
    const analysis = await analysisService.createAnalysis(req.body);

    return res.status(201).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    return next(error);
  }
}

async function listAnalyses(req, res, next) {
  try {
    const analyses = await analysisService.listAnalyses();

    return res.status(200).json({
      success: true,
      data: analyses
    });
  } catch (error) {
    return next(error);
  }
}

async function getAnalysis(req, res, next) {
  try {
    // Convertendo o ID que vem como texto na URL para um Número Inteiro
    const analysisId = Number(req.params.id);
    const analysis = await analysisService.getAnalysisById(analysisId);

    return res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  analyzeCode,
  listAnalyses,
  getAnalysis
};
