import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/api'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validação básica de senhas idênticas antes de enviar ao servidor
    if (password !== confirmPassword) {
      return setError('As senhas não coincidem.')
    }

    setLoading(true)

    try {
      // Dispara a criação da conta no backend
      await authService.register(email, password)
      
      setSuccess('Conta criada com sucesso! Redirecionando para o login...')
      
      // Aguarda 2 segundos para o usuário ler a mensagem e o manda para o Login
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-zinc-950 p-4 font-sans text-zinc-100 select-none">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-emerald-500/30">
        
        {/* Cabeçalho */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Criar Conta<span className="text-emerald-400">.AI</span>
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Comece a mapear e evoluir seus estudos com inteligência artificial
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          
          {/* Mensagens de Feedback */}
          {error && (
            <div className="rounded-lg border border-rose-500/20 bg-rose-950/20 p-3 text-center text-xs font-medium text-rose-400">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3 text-center text-xs font-medium text-emerald-400">
              {success}
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

            {/* Confirmação de Senha */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold tracking-wide uppercase text-zinc-400 mb-1.5">
                Confirmar Senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                disabled={loading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-emerald-500 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/10 transition-all duration-200 hover:bg-emerald-400 hover:shadow-emerald-400/20 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? 'Criando conta...' : 'Cadastrar e Começar'}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => navigate('/')}
              className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors py-1"
            >
              Já tenho uma conta, quero voltar ao login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}