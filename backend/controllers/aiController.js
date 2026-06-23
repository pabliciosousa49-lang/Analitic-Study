import { GoogleGenAI } from '@google/genai'; // Ou a biblioteca que você está usando para o Gemini

// Função que você já tem: export const analyzeCode = ...

export const generateQuiz = async (req, res) => {
  try {
    const { code, analysis } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'O código é obrigatório para gerar o quiz.' });
    }

  // Substitua pela sua instância ou configuração atual do Gemini/OpenAI
  // Exemplo usando o modelo correto:
  // const model = ai.models.get('gemini-2.5-flash'); 
  
  const prompt = `
    Você é um professor de programação focado em fixação de conteúdo.
    Com base no código fornecido pelo aluno e na análise técnica feita previamente, gere um quiz com exatamente 3 questões de múltipla escolha para testar o conhecimento do aluno sobre os pontos fracos ou conceitos usados no código.

    CÓDIGO DO ALUNO:
    \"\"\"
    ${code}
    \"\"\"

    ANÁLISE DA IA:
    \"\"\"
    ${analysis || 'Não há análise prévia disponível.'}
    \"\"\"

    REGRAS CRÍTICAS:
    1. Retorne ESTRUTURADAMENTE E APENAS um objeto JSON. Não use blocos de Markdown como \`\`\`json \`\`\`. Retorne o texto puro do JSON.
    2. Cada questão deve ter exatamente 4 alternativas.
    3. O campo 'answerIndex' deve ser o índice numérico da resposta correta (0 para a primeira, 1 para a segunda, etc).
    4. O ID de cada questão deve ser um número único (1, 2, 3).

    FORMATO DO JSON ESPERADO:
    {
      "questions": [
        {
          "id": 1,
          "question": "Texto da pergunta aqui?",
          "options": ["Alternativa 0", "Alternativa 1", "Alternativa 2", "Alternativa 3"],
          "answerIndex": 1
        }
      ]
    }
  `;

    // Adapte a chamada abaixo para a sintaxe exata da biblioteca de IA que você inicializou no seu projeto
    const response = await model.generateContent({ prompt });
    const responseText = response.text.trim();

    // Converte a string da IA em objeto Javascript real antes de mandar pro front
    const quizData = JSON.parse(responseText);

    return res.json(quizData);

  } catch (error) {
    console.error('Erro ao gerar quiz com IA:', error);
    return res.status(500).json({ 
      error: 'Falha interna ao gerar o quiz.',
      questions: [] // Evita que o front quebre caso retorne erro
    });
  }
};