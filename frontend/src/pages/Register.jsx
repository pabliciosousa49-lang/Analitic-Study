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
      setError(err.message || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-screen bg-[#030712] font-sans text-zinc-100 antialiased overflow-x-hidden flex select-none">
      
      {/* ==========================================
          FONDO TECNOLÓGICO PREMIUM (Efeitos de Luz e Profundidade)
         ========================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Luzes difusas em gradiente de fundo */}
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-[40%] left-[30%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />
        
        {/* Grid de Linhas Estilo Rede Neural */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Container Principal em Grid */}
      <div className="relative w-full grid lg:grid-cols-2 z-10">
        
        {/* ==========================================
            LADO ESQUERDO: ÁREA INSTITUCIONAL (Desktop)
           ========================================== */}
        <div className="hidden lg:flex flex-col justify-between p-16 border-r border-zinc-900 bg-zinc-950/20 backdrop-blur-3xl relative overflow-hidden">
          {/* Partículas sutis */}
          <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-purple-400/30 blur-[1px] animate-bounce" style={{ animationDuration: '5s' }} />
          <div className="absolute bottom-1/3 right-16 w-3 h-3 rounded-full bg-cyan-400/20 blur-[2px] animate-bounce" style={{ animationDuration: '7s' }} />

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

          {/* Centro - Mensagem de Boas-vindas ao Cadastro */}
          <div className="max-w-xl space-y-8 my-auto">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 px-3 py-1 text-xs font-medium text-purple-400 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                Crie sua credencial de desenvolvedor
              </span>
              <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                Inicie sua Jornada de <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Evolução</span>
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed">
                Faça parte de uma comunidade focada em alta performance. Escreva códigos melhores, entenda seus erros e domine novas tecnologias com suporte de inteligência artificial.
              </p>
            </div>

            {/* Ilustração Técnica Mockup Glassmorphism */}
            <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/10 p-5 backdrop-blur-md shadow-2xl relative group">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-3 mb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                <span className="text-[11px] font-mono text-zinc-600 ml-2">student_session.js</span>
              </div>
              <pre className="font-mono text-xs text-zinc-400 leading-relaxed overflow-x-auto">
                <code>
{`// Inicializando novo perfil na plataforma...
const student = await CodeStudy.register({
  secure: true,
  environment: "Production"
});

await student.setupWorkspace();
console.log(student.ready); // 🎓 "Acesso liberado!"`}
                </code>
              </pre>
            </div>
          </div>

          {/* Rodapé */}
          <div className="text-xs text-zinc-500">
            &copy; 2026 CodeStudy. Educação tecnológica de alto nível.
          </div>
        </div>

        {/* ==========================================
            LADO DIREITO: CARD DE CADASTRO (Com Vídeo de Fundo)
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

          {/* Máscara de Contraste e Desfoque */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/85 via-[#030712]/70 to-[#030712]/90 backdrop-blur-[1px] z-5 pointer-events-none" />

          {/* Elementos internos agrupados acima do vídeo e da máscara */}
          <div className="relative w-full max-w-[440px] z-10 flex flex-col items-center">
            
            {/* Logo Mobile/Tablet */}
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-black text-xs text-white">
                CS
              </div>
              <span className="text-lg font-bold text-white">CodeStudy</span>
            </div>

            {/* Card Principal Glassmorphism */}
            <div className="w-full rounded-2xl border border-zinc-800/50 bg-zinc-950/40 p-8 backdrop-blur-xl shadow-2xl shadow-black/80">
              
              <div className="space-y-1 mb-5">
                <h2 className="text-2xl font-bold tracking-tight text-white">Criar Conta</h2>
                <p className="text-sm text-zinc-400">Comece a mapear e evoluir seus estudos com IA.</p>
              </div>

              {/* Mensagens de Feedback */}
              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-500/10 bg-rose-950/20 px-4 py-2.5 text-sm font-medium text-rose-400">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-500/10 bg-emerald-950/20 px-4 py-2.5 text-sm font-medium text-emerald-400">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Campo de E-mail */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
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
                    className="mt-1.5 w-full rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 transition-all duration-200 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50"
                  />
                </div>

                {/* Campo de Senha */}
                <div>
                  <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
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
                    className="mt-1.5 w-full rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 transition-all duration-200 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50"
                  />
                </div>

                {/* Confirmação de Senha */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
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
                    className="mt-1.5 w-full rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 transition-all duration-200 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50"
                  />
                </div>

                {/* Botão de Cadastro Principal */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 py-3 text-sm font-bold text-white hover:opacity-95 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-600/10 hover:shadow-blue-600/20 mt-2"
                >
                  {loading ? 'Criando conta...' : 'Cadastrar e Começar'}
                </button>

                {/* Link para Voltar ao Login */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => navigate('/')}
                  className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors pt-2 block"
                >
                  Já tenho uma conta, quero voltar ao login
                </button>

              </form>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}