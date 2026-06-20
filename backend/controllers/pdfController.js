// Controller HTTP de PDF. Busca a analise salva e retorna o arquivo gerado.

const analysisService = require('../services/analysisService');
const pdfService = require('../services/pdfService');

async function generatePdf(req, res, next) {
  try {
    const analysis = await analysisService.getAnalysisById(req.params.id);
    const pdfBuffer = await pdfService.generateAnalysisPdf(analysis);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=analysis-${analysis.id}.pdf`);

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  generatePdf
};
