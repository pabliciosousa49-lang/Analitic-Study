import { GoogleGenAI } from '@google/genai'

export const analyzeCode = async (req, res) => {
  try {
    const { code } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Nenhum código foi fornecido para análise.' })
    }

    // Inicializa o SDK do Gemini usando a chave que guardamos no .env
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

    // Criamos as instruções (Prompt) dizendo exatamente como a IA deve se comportar
    const prompt = `
      Você é um tutor de programação especialista e focado em ajudar estudantes.
      Analise o código abaixo e traga um diagnóstico claro, apontando pontos positivos, 
      erros de lógica ou de sintaxe se houverem, e sugestões de boas práticas de forma didática.

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