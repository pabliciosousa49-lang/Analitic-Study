import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simulação temporária de autenticação para testar a rota
    if (email && password) {
      navigate('/dashboard')
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>

          {/* Botão de Entrar */}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg bg-emerald-500 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/10 transition-all duration-200 hover:bg-emerald-400 hover:shadow-emerald-400/20 active:scale-[0.98]"
            >
              Acessar Plataforma
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}