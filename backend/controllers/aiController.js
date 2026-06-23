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