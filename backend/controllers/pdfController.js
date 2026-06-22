// Controller HTTP de PDF. Busca a analise salva e retorna o arquivo gerado.
import analysisService from '../services/analysisService.js'
import pdfService from '../services/pdfService.js'

async function generatePdf(req, res, next) {
  try {
    // Convertendo o ID que vem como texto na URL para um Número Inteiro
    const analysisId = Number(req.params.id)
    const analysis = await analysisService.getAnalysisById(analysisId)
    const pdfBuffer = await pdfService.generateAnalysisPdf(analysis)
    
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=analysis-${analysis.id}.pdf`)

    return res.status(200).send(pdfBuffer)
  } catch (error) {
    return next(error)
  }
}

// Exportação padrão moderna contendo a função
export default {
  generatePdf
}