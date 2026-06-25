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

// Service unificado e corrigido usando Fetch e as rotas certas do backend
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

  generateQuiz: async (code, analysis) => {
    const response = await fetch(`${API_URL}/ai/generate-quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, analysis }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Erro ao gerar as questões do quiz.')
    return data
  }
}