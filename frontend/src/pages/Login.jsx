import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/api' // Importação do serviço de API

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') // Estado para capturar mensagens de erro
  const [loading, setLoading] = useState(false) // Estado para controle de loading do botão
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Envia os dados reais para o backend
      const data = await authService.login(email, password)
      
      // Guarda com segurança o token e dados básicos do usuário no localStorage
      localStorage.setItem('@CodeStudy:token', data.token)
      localStorage.setItem('@CodeStudy:user', JSON.stringify(data.user))

      // Navega instantaneamente para o Dashboard
      navigate('/dashboard')
    } catch (err) {
      // Define a mensagem de erro retornada pelo backend (Ex: "E-mail ou senha incorretos.")
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-zinc-950 p-4 font-sans text-zinc-100 select-none">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-emerald-500/30">
        
        {/* Cabeçalho do Formulário */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            CodeStudy<span className="text-emerald-400">.AI</span>
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Entre para acessar seu ecossistema de aprendizado
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          
          {/* Mensagem de Erro Dinâmica */}
          {error && (
            <div className="rounded-lg border border-rose-500/20 bg-rose-950/20 p-3 text-center text-xs font-medium text-rose-400">
              {error}
            </div>
          )}

          <div className="space-y-4 rounded-md">
            
            {/* Campo de E-mail */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold tracking-wide uppercase text-zinc-400 mb-1.5">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 disabled:opacity-50"
              />
            </div>

            {/* Campo de Senha */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold tracking-wide uppercase text-zinc-400 mb-1.5">
                Senha
              </label>
              <input
                id="password"
                type="password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Bloco de Ações (Botão Entrar + Link de Cadastro) */}
          <div className="space-y-4">
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-lg bg-emerald-500 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/10 transition-all duration-200 hover:bg-emerald-400 hover:shadow-emerald-400/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Autenticando...' : 'Acessar Plataforma'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                disabled={loading}
                onClick={() => navigate('/register')}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors bg-transparent border-none cursor-pointer outline-none"
              >
                Não tem uma conta? Cadastre-se aqui
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}