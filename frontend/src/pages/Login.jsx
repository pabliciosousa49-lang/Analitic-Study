import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(false)

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    setLoading(true)
    try {
      await authService.login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Credenciais inválidas. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-screen bg-[#030712] font-sans text-zinc-100 antialiased overflow-x-hidden flex">
      
      {/* ==========================================
          FONDO TECNOLÓGICO PREMIUM (Efeitos de Luz e Profundidade)
         ========================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Luzes difusas em gradiente de fundo */}
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-[40%] left-[30%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />
        
        {/* Grid de Linhas Estilo Rede Neural / Código Sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Container Principal em Grid */}
      <div className="relative w-full grid lg:grid-cols-2 z-10">
        
        {/* ==========================================
            LADO ESQUERDO: ÁREA INSTITUCIONAL (Desktop)
           ========================================== */}
        <div className="hidden lg:flex flex-col justify-between p-16 border-r border-zinc-900 bg-zinc-950/20 backdrop-blur-3xl relative overflow-hidden">
          {/* Partículas sutis no fundo do painel esquerdo */}
          <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-cyan-400/30 blur-[1px] animate-bounce" style={{ animationDuration: '5s' }} />
          <div className="absolute bottom-1/3 right-16 w-3 h-3 rounded-full bg-purple-400/20 blur-[2px] animate-bounce" style={{ animationDuration: '7s' }} />

          {/* Topo - Branding */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-[1px] shadow-lg shadow-blue-500/10">
              <div className="h-full w-full bg-zinc-950 rounded-[11px] flex items-center justify-center font-black text-sm tracking-tight text-white">
                CS
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              CodeStudy
            </span>
          </div>

          {/* Centro - Mensagem Principal e Ilustração de Código */}
          <div className="max-w-xl space-y-8 my-auto">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs font-medium text-blue-400 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Plataforma SaaS de Aprendizado Avançado
              </span>
              <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                Aprenda Programação de Forma <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Inteligente</span>
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed">
                Analise códigos, receba explicações detalhadas e acelere sua evolução como desenvolvedor com o auxílio de IA especializada.
              </p>
            </div>

            {/* Ilustração Técnica / Mockup de Código Glassmorphism */}
            <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/10 p-5 backdrop-blur-md shadow-2xl relative group">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-3 mb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                <span className="text-[11px] font-mono text-zinc-600 ml-2">codestudy_analyzer.js</span>
              </div>
              <pre className="font-mono text-xs text-zinc-400 leading-relaxed overflow-x-auto">
                <code>
{`// Analisando arquitetura do sistema...
const tutor = await CodeStudy.initIA();
const feedback = await tutor.analyze({
  code: userProject,
  focus: "Boas práticas & Performance"
});

console.log(feedback.status); // 🚀 "Pronto para evoluir"`}
                </code>
              </pre>
            </div>
          </div>

          {/* Rodapé Institucional */}
          <div className="text-xs text-zinc-500">
            &copy; 2026 CodeStudy. Educação tecnológica de alto nível.
          </div>
        </div>

        {/* ==========================================
            LADO DIREITO: CARD DE LOGIN (Com Vídeo de Fundo)
           ========================================== */}
        <div className="relative flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 overflow-hidden">
          
          {/* Tag de Vídeo em Loop */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          >
            <source src="/login-bg.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>

          {/* Máscara de Contraste para escurecer o vídeo de fundo e não atrapalhar a leitura */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/85 via-[#030712]/70 to-[#030712]/90 backdrop-blur-[1px] z-5 pointer-events-none" />

          {/* Elementos internos agrupados acima do vídeo e da máscara */}
          <div className="relative w-full max-w-[440px] z-10 flex flex-col items-center">
            
            {/* Logo exibida no Mobile/Tablet apenas */}
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-black text-xs text-white">
                CS
              </div>
              <span className="text-lg font-bold text-white">CodeStudy</span>
            </div>

            {/* Card Principal Glassmorphism (Ajustado para o fundo com vídeo) */}
            <div className="w-full rounded-2xl border border-zinc-800/50 bg-zinc-950/40 p-8 backdrop-blur-xl shadow-2xl shadow-black/80">
              
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-white">Acesse sua conta</h2>
                <p className="text-sm text-zinc-400">Insira suas credenciais para continuar seus estudos.</p>
              </div>

              {error && (
                <div className="mb-5 flex items-center gap-2 rounded-xl border border-rose-500/10 bg-rose-950/20 px-4 py-3 text-sm font-medium text-rose-400">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    E-mail institucional
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="exemplo@codestudy.com"
                    className="mt-2 w-full rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 transition-all duration-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 disabled:opacity-50"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Sua senha secreta
                    </label>
                    <a href="#" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                      Esqueceu a senha?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 transition-all duration-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 disabled:opacity-50"
                  />
                </div>

                {/* Checkbox "Lembrar-me" */}
                <div className="flex items-center py-1">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-800 bg-zinc-950 text-blue-600 focus:ring-blue-500/50 focus:ring-offset-0"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-xs font-medium text-zinc-400 select-none cursor-pointer">
                    Manter-me conectado neste dispositivo
                  </label>
                </div>

                {/* Botão de Acesso Principal com Efeito Glow */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 py-3 text-sm font-bold text-white hover:opacity-95 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/10 hover:shadow-purple-600/20"
                >
                  {loading ? '⏳ Processando autenticação...' : 'Entrar na Plataforma'}
                </button>
              </form>

              {/* Divisor Visual para Redes Sociais */}
              <div className="relative my-6 w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800/80" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider">
                  <span className="bg-[#05070f] px-3 text-zinc-500 font-medium rounded-full border border-zinc-800/40 py-0.5">Ou continue com</span>
                </div>
              </div>

              {/* Botões Sociais Premium */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/40 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all duration-200"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.422 2.113 15.6 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.34 0 10.556-4.444 10.556-10.74 0-.724-.078-1.282-.176-1.975H12.24z"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/40 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all duration-200"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.08.069-.08 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </button>
              </div>

              {/* Link Inferior de Criação de Conta */}
              <div className="mt-8 pt-4 text-center w-full">
                <p className="text-xs text-zinc-500">
                  Não possui uma credencial?{' '}
                  <Link to="/register" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                    Criar conta de estudante
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}