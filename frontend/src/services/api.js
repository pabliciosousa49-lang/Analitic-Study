const API_URL = 'http://localhost:3000/api'

export const authService = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Erro ao realizar login.')
    return data
  },

  register: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Erro ao criar conta.')
    return data
  }
}

// 👇 Serviço atualizado para consumir a análise e a geração de quiz da IA
export const aiService = {
  analyzeCode: async (code) => {
    const response = await fetch(`${API_URL}/ai/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Erro ao analisar o código.')
    return data
  },

  // Novo método para solicitar o quiz de 20 perguntas baseado no código e diagnóstico
  generateQuiz: async (code, analysis) => {
    const response = await fetch(`${API_URL}/ai/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, analysis }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Erro ao gerar as questões do quiz.')
    return data
  }
}