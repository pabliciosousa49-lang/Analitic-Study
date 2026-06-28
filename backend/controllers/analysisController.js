// Importações usando o padrão ESM e Exportações Nomeadas
import * as analysisService from '../services/analysisService.js';

export async function analyzeCode(req, res, next) {
  try {
    const analysis = await analysisService.createAnalysis(req.body);
    return res.status(201).json({ success: true, data: analysis });
  } catch (error) {
    return next(error);
  }
}

export async function listAnalyses(req, res, next) {
  try {
    const analyses = await analysisService.listAnalyses();
    return res.status(200).json({ success: true, data: analyses });
  } catch (error) {
    return next(error);
  }
}

// Nota: A função generatePdf foi removida conforme sua solicitação.