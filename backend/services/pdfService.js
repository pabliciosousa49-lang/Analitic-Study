// Service responsavel por transformar uma analise salva em um PDF usando PDFKit.

const PDFDocument = require('pdfkit');

function addSection(doc, title, content) {
  doc.moveDown();
  doc.fontSize(14).font('Helvetica-Bold').text(title);
  doc.moveDown(0.3);
  doc.fontSize(11).font('Helvetica').text(content, {
    align: 'left'
  });
}

function generateAnalysisPdf(analysis) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 50,
      size: 'A4'
    });

    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    doc.fontSize(22).font('Helvetica-Bold').text('CodeStudy AI', {
      align: 'center'
    });

    doc.moveDown(0.5);
    doc.fontSize(13).font('Helvetica').text('Relatorio de Analise de Codigo', {
      align: 'center'
    });

    addSection(doc, 'Dados da Analise', [
      `ID: ${analysis.id}`,
      `Linguagem: ${analysis.language}`,
      `Criada em: ${analysis.createdAt.toISOString()}`
    ].join('\n'));

    addSection(doc, 'Resumo', analysis.summary);
    addSection(doc, 'Explicacao', analysis.explanation);
    addSection(doc, 'Codigo enviado', analysis.code);

    doc.end();
  });
}

module.exports = {
  generateAnalysisPdf
};
