import { GoogleGenAI } from '@google/genai'

export const analyzeCode = async (req, res) => {
  try {
    const { code } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Nenhum código foi fornecido para análise.' })
    }

    // Inicializa o SDK do Gemini usando a chave que guardamos no .env
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

    // Criamos as instruções (Prompt) com regras estritas de formatação Markdown para o Front-end
    const prompt = `
      Você é um tutor de programação especialista e focado em ajudar estudantes de alto nível.
      Analise o código fornecido e traga um diagnóstico claro, didático e focado na evolução do aluno.

      Sua resposta DEVE seguir estritamente as seguintes regras de formatação Markdown para que o nosso sistema consiga renderizar a interface corretamente:
      
      1. TÍTULOS PRINCIPAIS: Use obrigatoriamente a sintaxe "### Nome do Título" para seções como Diagnóstico, Pontos Positivos, Oportunidades de Melhoria ou Correções.
      2. DESTAQUES E TERMOS IMPORTANTES: Sempre que citar variáveis, funções, conceitos vitais ou palavras-chave importantes no meio do texto descritivo, envolva-as em **negrito** (exemplo: **const**, **useEffect**, **complexidade O(n)**).
      3. EXEMPLOS DE CÓDIGO: Sempre que for mostrar um exemplo de código corrigido ou sugerido, você DEVE envelopá-lo estritamente usando três crases juntamente com a especificação da linguagem minúscula (exemplo: \`\`\`javascript ou \`\`\`python ou \`\`\`html). Nunca jogue linhas de código soltas no texto sem esse bloco de crases.

      Código a ser analisado:
      ${code}
    `

    // Faz a chamada oficial para o modelo do Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })

    // Retorna o texto gerado pela IA para o nosso frontend
    return res.json({ analysis: response.text })

  } catch (error) {
    console.error('Erro na análise do Gemini:', error)
    return res.status(500).json({ error: 'Erro interno ao processar a análise com a IA.' })
  }
}

// NOVA FUNÇÃO: Gera um quiz estruturado de 20 questões baseado no código e análise anterior
export const generateQuiz = async (req, res) => {
  try {
    const { code, analysis } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Nenhum código foi fornecido para gerar o quiz.' })
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

    const prompt = `
      Você é um professor de programação especialista. Com base no código do aluno e no diagnóstico prévio fornecido, crie um quiz de EXATAMENTE 20 questões de múltipla escolha para testar profundamente o conhecimento do aluno sobre os conceitos envolvidos, os erros cometidos e as correções necessárias.

      Código do Aluno:
      ${code}

      Diagnóstico Prévio:
      ${analysis || 'Análise de boas práticas e sintaxe.'}

      REGRAS CRÍTICAS DE RETORNO:
      1. Seu retorno deve ser EXCLUSIVAMENTE um objeto JSON válido, sem blocos de texto explicativos antes ou depois, e sem marcações de crase de bloco (\`\`\`json). Devolva apenas as chaves do JSON bruto.
      2. O formato do JSON deve conter uma propriedade raiz chamada "questions" que é um array contendo rigorosamente 20 objetos. Cada objeto deve seguir exatamente esta estrutura:
      {
        "id": 1,
        "question": "Texto da pergunta aqui...",
        "options": ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
        "correctAnswerIndex": 0,
        "explanation": "Explicação detalhada e didática do porquê esta alternativa está correta, destrinchando o erro das outras para validar o aprendizado."
      }

      Gere questões técnicas inteligentes que variem entre lógica, sintaxe, comportamento de escopo, performance e boas práticas para a linguagem do código enviado.
    `

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    })

    // Converte a string de texto purificada em um objeto JSON real para o frontend
    const quizData = JSON.parse(response.text.trim())
    return res.json(quizData)

  } catch (error) {
    console.error('Erro ao gerar o quiz com o Gemini:', error)
    return res.status(500).json({ error: 'Erro interno ao processar as questões do quiz.' })
  }
}