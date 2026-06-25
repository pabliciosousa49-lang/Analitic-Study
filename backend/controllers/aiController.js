import { GoogleGenerativeAI } from "@google/generative-ai";
import PDFDocument from 'pdfkit';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Função auxiliar para encontrar o modelo correto
async function getModel() {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash" // Certifique-se de usar um modelo válido na sua conta
  });
  return model;
}

export const analyzeCode = async (req, res) => {
  try {
    const { code } = req.body;
    const model = await getModel();

    const result = await model.generateContent(`Analise este código: ${code}`);
    const response = await result.response;

    return res.json({ analysis: response.text() });
  } catch (error) {
    console.error("ERRO CRÍTICO NA IA:", error);
    return res.status(500).json({ error: "Erro na comunicação com a IA: " + error.message });
  }
};

export const generateQuiz = async (req, res) => {
  try {
    const { code, analysis } = req.body;
    const model = await getModel();

    const prompt = `
      Com base neste código: ${code} 
      e nesta análise: ${analysis}, 
      crie um quiz de 10 perguntas.
      
      Responda APENAS com um objeto JSON estruturado assim:
      {
        "questions": [
          {
            "id": 1,
            "question": "Pergunta...",
            "options": ["A", "B", "C", "D"],
            "answerIndex": 0,
            "explanation": "Explicação técnica detalhada."
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    return res.json(JSON.parse(text));
  } catch (error) {
    console.error("ERRO CRÍTICO NO QUIZ:", error);
    return res.status(500).json({ error: "Erro ao gerar quiz: " + error.message });
  }
};

// Nova função para gerar o PDF
export const generatePdfReport = async (req, res) => {
  try {
    const { code, analysis, questions, selectedAnswers } = req.body;

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio-estudo.pdf');

    doc.pipe(res);

    // Cabeçalho do Relatório
    doc.fontSize(20).text('Relatório de Estudo - CodeStudy.AI', { align: 'center' });
    doc.moveDown();

    // Seção de Código
    doc.fontSize(14).text('Código Analisado:', { underline: true });
    doc.fontSize(10).font('Courier').text(code);
    doc.moveDown();

    // Seção de Análise
    doc.fontSize(14).font('Helvetica').text('Resumo da Análise:', { underline: true });
    doc.fontSize(12).text(analysis);
    doc.moveDown(2);

    // Seção do Quiz
    doc.fontSize(14).text('Resultados do Quiz:', { underline: true });
    doc.moveDown();

    questions.forEach((q, index) => {
      const userSelected = selectedAnswers[q.id];
      const isCorrect = userSelected === q.answerIndex;
      
      doc.fontSize(12).text(`${index + 1}. ${q.question}`);
      doc.fontSize(10).text(`Sua resposta: ${q.options[userSelected] || 'Não respondida'}`);
      doc.fontSize(10).text(`Status: ${isCorrect ? '✅ Correto' : '❌ Incorreto'}`);
      doc.fontSize(10).text(`Explicação: ${q.explanation}`, { italic: true });
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    res.status(500).json({ error: "Falha ao gerar PDF: " + error.message });
  }
};