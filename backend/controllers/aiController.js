import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Função auxiliar para encontrar o modelo correto
async function getModel() {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
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

    // Prompt reforçado para incluir explicações
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
      // ... até completar 10 perguntas
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