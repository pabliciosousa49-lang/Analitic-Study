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
    
    const prompt = `Crie um quiz com 3 perguntas sobre este código: ${code}. Responda APENAS com JSON no formato: {"questions": [{"id":1, "question":"...", "options":["..."], "answerIndex":0}]}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    return res.json(JSON.parse(text));
  } catch (error) {
    console.error("ERRO CRÍTICO NO QUIZ:", error);
    return res.status(500).json({ error: "Erro ao gerar quiz: " + error.message });
  }
};