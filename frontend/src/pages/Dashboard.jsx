import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { aiService } from '../services/api'

// Importações para a renderização inteligente de Markdown e código estilo VS Code
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Dashboard() {
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('dashboard')
  const [code, setCode] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [loading, setLoading] = useState(false)

  // ESTADOS DO QUIZ
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizLoading, setQuizLoading] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({}) // Salva { questionId: alternativeIndex }
  const [isQuizActive, setIsQuizActive] = useState(false)

  const [modules] = useState([
    { id: 1, title: 'Lógica de Programação e Algoritmos', status: 'Em andamento', progress: 65, color: 'border-purple-500/20 bg-purple-500/5 text-purple-400' },
    { id: 2, title: 'Desenvolvimento Web Full-Stack com Node.js', status: 'Não iniciado', progress: 0, color: 'border-zinc-800 bg-zinc-900/10 text-zinc-500' },
    { id: 3, title: 'Estruturas de Dados Avançadas', status: 'Concluído', progress: 100, color: 'border-blue-500/20 bg-blue-500/5 text-blue-400' },
  ])

  const handleLogout = () => {
    navigate('/')
  }

  const handleAnalyzeCode = async (e) => {
    e.preventDefault()
    if (!code.trim()) return

    setLoading(true)
    setAiResponse('')
    setQuizQuestions([])
    setIsQuizActive(false)

    try {
      const data = await aiService.analyzeCode(code)
      setAiResponse(data.analysis)
    } catch (error) {
      console.error(error)
      setAiResponse('### ❌ Erro de Conexão\nOcorreu um erro ao tentar se comunicar com o servidor. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleStartQuiz = async () => {
    setQuizLoading(true)
    try {
      const data = await aiService.generateQuiz(code, aiResponse)
      if (data && data.questions) {
        setQuizQuestions(data.questions)
        setCurrentQuestionIndex(0)
        setSelectedAnswers({})
        setIsQuizActive(true)
      }
    } catch (error) {
      console.error(error)
      alert('Não foi possível gerar o quiz neste momento. Tente novamente.')
    } finally {
      setQuizLoading(false)
    }
  }

  const handleSelectAlternative = (alternativeIndex) => {
    const currentQuestion = quizQuestions[currentQuestionIndex]
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: alternativeIndex
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleGenerateReport = () => {
    alert('Fase 2 Concluída com Sucesso! Na próxima fase vamos renderizar o PDF real com as explicações comentadas.')
  }

  return (
    <div className="relative min-h-screen w-screen bg-[#030712] font-sans text-zinc-100 antialiased overflow-x-hidden flex select-none">
      
      {/* FONDO TECNOLÓGICO */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293705_1px,transparent_1px),linear-gradient(to_bottom,#1f293705_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* 1. MENU LATERAL */}
      <aside className="w-64 border-r border-zinc-900 bg-zinc-950/40 backdrop-blur-3xl p-6 flex flex-col justify-between hidden md:flex z-10 relative">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-[1px] shadow-md shadow-blue-500/5">
              <div className="h-full w-full bg-zinc-950 rounded-[11px] flex items-center justify-center font-black text-xs text-white">
                CS
              </div>
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              CodeStudy
            </span>
          </div>

          <nav className="space-y-1.5">
            <button 
              onClick={() => { setActiveTab('dashboard'); setIsQuizActive(false); }}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-zinc-900 to-zinc-900/50 text-white border border-zinc-800/80 shadow-inner' 
                  : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200'
              }`}
            >
              <span className={`transition-transform duration-200 ${activeTab === 'dashboard' ? 'scale-110 text-blue-400' : 'text-zinc-500'}`}>
                📊
              </span>
              Painel Geral
            </button>
            
            <button 
              onClick={() => setActiveTab('analyzer')}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'analyzer' 
                  ? 'bg-gradient-to-r from-zinc-900 to-zinc-900/50 text-white border border-zinc-800/80 shadow-inner' 
                  : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200'
              }`}
            >
              <span className={`transition-transform duration-200 ${activeTab === 'analyzer' ? 'scale-110 text-purple-400' : 'text-zinc-500'}`}>
                🤖
              </span>
              Analisador IA
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full rounded-xl border border-zinc-900 bg-zinc-950/60 py-2.5 text-xs font-bold text-zinc-500 hover:bg-rose-950/20 hover:text-rose-400 hover:border-rose-500/20 transition-all duration-200 tracking-wide uppercase"
        >
          Sair do Sistema
        </button>
      </aside>

      {/* 2. ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0 z-10 relative">
        
        <header className="h-16 border-b border-zinc-900 bg-zinc-950/20 backdrop-blur-md px-8 flex items-center justify-between">
          <h1 className="text-base font-bold text-zinc-100 tracking-tight flex items-center gap-2">
            {activeTab === 'dashboard' ? 'Painel de Estudos' : isQuizActive ? 'Fixação de Conhecimento' : 'Analisador de Código com IA'}
          </h1>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-zinc-400">Estudante</p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-[1px] shadow-md shadow-purple-500/10">
              <div className="h-full w-full bg-zinc-950 rounded-[10px] flex items-center justify-center font-bold text-zinc-200 text-sm">
                U
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 flex-1 overflow-y-auto">
          
          {activeTab === 'dashboard' ? (
            <>
              {/* Grid de Métricas */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/30 p-6 backdrop-blur-xl relative overflow-hidden group hover:border-zinc-800 transition-all duration-300">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Horas de Estudo</p>
                  <p className="mt-2 text-3xl font-extrabold text-white tracking-tight">24.5h</p>
                  <div className="absolute top-0 right-0 h-24 w-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />
                </div>
                
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/30 p-6 backdrop-blur-xl relative overflow-hidden group hover:border-zinc-800 transition-all duration-300">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Módulos Concluídos</p>
                  <p className="mt-2 text-3xl font-extrabold text-white tracking-tight">1<span className="text-zinc-600 font-medium text-lg">/3</span></p>
                  <div className="absolute top-0 right-0 h-24 w-24 bg-purple-500/5 rounded-bl-full pointer-events-none" />
                </div>
                
                <div className="rounded-2xl border border-zinc-800/30 bg-purple-950/5 p-6 backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/20 transition-all duration-300">
                  <p className="text-xs font-bold text-purple-400/80 uppercase tracking-wider">Análises de IA Restantes</p>
                  <p className="mt-2 text-3xl font-extrabold text-purple-400 tracking-tight">15</p>
                  <div className="absolute top-0 right-0 h-24 w-24 bg-purple-500/10 rounded-bl-full pointer-events-none" />
                </div>
              </div>

              {/* Trilhas Académicas */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Minha Trilha Acadêmica</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {modules.map((mod) => (
                    <div 
                      key={mod.id} 
                      className={`flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:border-zinc-700/50 bg-zinc-950/20 ${mod.color.split(' ')[0]}`}
                    >
                      <div>
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border ${mod.color}`}>
                          {mod.status}
                        </span>
                        <h4 className="mt-4 font-bold text-white text-base leading-snug tracking-tight">{mod.title}</h4>
                      </div>
                      
                      <div className="mt-8 space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-zinc-500">Progresso</span>
                          <span className="text-zinc-300">{mod.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-zinc-950 overflow-hidden border border-zinc-900">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              mod.progress === 100 
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-400' 
                                : mod.progress > 0 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                                : 'bg-zinc-800'
                            }`}
                            style={{ width: `${mod.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : isQuizActive ? (
            /* TELA EXCLUSIVA DO QUIZ DE FIXAÇÃO */
            <div className="max-w-3xl mx-auto rounded-2xl border border-zinc-900 bg-zinc-950/20 p-8 backdrop-blur-xl flex flex-col space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md">
                    Questão {currentQuestionIndex + 1} de {quizQuestions.length}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight mt-2">Teste seus Conhecimentos</h3>
                </div>
                <button 
                  onClick={() => setIsQuizActive(false)}
                  className="text-xs font-semibold text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  ↩ Voltar para Análise
                </button>
              </div>

              {/* Enunciado da Pergunta */}
              <p className="text-zinc-200 text-base font-medium leading-relaxed bg-zinc-950/40 border border-zinc-900 p-5 rounded-xl">
                {quizQuestions[currentQuestionIndex]?.question}
              </p>

              {/* Lista de Alternativas */}
              <div className="space-y-3">
                {quizQuestions[currentQuestionIndex]?.options.map((option, index) => {
                  const isSelected = selectedAnswers[quizQuestions[currentQuestionIndex].id] === index
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAlternative(index)}
                      className={`w-full text-left rounded-xl p-4 text-sm font-medium transition-all duration-200 border flex items-center justify-between ${
                        isSelected 
                          ? 'bg-purple-600/10 border-purple-500 text-white shadow-md shadow-purple-500/5' 
                          : 'bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-purple-500 bg-purple-500' : 'border-zinc-700'}`}>
                        {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Botões de Navegação do Quiz */}
              <div className="flex items-center justify-between border-t border-zinc-900 pt-6 mt-4">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-5 py-2.5 rounded-xl border border-zinc-900 bg-zinc-950/40 text-xs font-bold text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  Voltar
                </button>

                {currentQuestionIndex === quizQuestions.length - 1 ? (
                  <button
                    onClick={handleGenerateReport}
                    disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-purple-600/20"
                  >
                    📋 Gerar Relatório
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswers[quizQuestions[currentQuestionIndex].id] === undefined}
                    className="px-6 py-2.5 rounded-xl bg-zinc-100 text-xs font-bold text-zinc-950 hover:bg-white active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Avançar
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* ANALISADOR DE IA COM COMPONENTE DE RENDERIZAÇÃO CUSTOMIZADO */
            <div className="grid gap-6 lg:grid-cols-2 flex-1 items-stretch">
              
              {/* Lado Esquerdo: Textarea */}
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950/20 p-6 backdrop-blur-xl flex flex-col space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Cole seu código aqui</h3>
                  <p className="text-xs text-zinc-400 mt-1">Nossa inteligência artificial vai analisar a estrutura e apontar melhorias.</p>
                </div>
                
                <form onSubmit={handleAnalyzeCode} className="flex-1 flex flex-col space-y-4">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={loading || quizLoading}
                    placeholder="// Insira seu código JavaScript, Python, HTML..."
                    className="w-full flex-1 min-h-[380px] rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4 font-mono text-sm text-zinc-200 placeholder-zinc-600 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading || quizLoading || !code.trim()}
                    className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 py-3 text-sm font-bold text-white hover:opacity-95 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-600/10 hover:shadow-blue-600/20"
                  >
                    {loading ? '⏳ Analisando código...' : '🚀 Analisar Código com Gemini'}
                  </button>
                </form>
              </div>

              {/* Lado Direito: Resposta com Renderizador Visual Avançado */}
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950/20 p-6 backdrop-blur-xl flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white tracking-tight">Resultado da Análise</h3>
                  
                  {/* BOTÃO PARA DISPARAR O QUIZ DE FIXAÇÃO */}
                  {aiResponse && !loading && (
                    <button
                      onClick={handleStartQuiz}
                      disabled={quizLoading}
                      className="px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 text-xs font-bold text-purple-400 hover:bg-purple-500/20 active:scale-[0.98] transition-all flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {quizLoading ? '⏳ Criando Questões...' : '🧠 Treinar com Quiz'}
                    </button>
                  )}
                </div>
                
                <div className="flex-1 rounded-xl border border-zinc-800/50 bg-zinc-950/40 p-5 overflow-y-auto max-h-[480px]">
                  {loading ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto">
                      <span className="text-3xl animate-pulse mb-3">🤖</span>
                      <p className="text-sm text-purple-400 font-bold tracking-wide animate-pulse">O Gemini está lendo seu código e preparando o feedback...</p>
                    </div>
                  ) : aiResponse ? (
                    
                  /* RENDERIZADOR ESTRUTURADO DE MARKDOWN */
          <div className="prose prose-invert max-w-none text-sm text-zinc-300 leading-relaxed space-y-4 selection:bg-purple-500/30">
            <ReactMarkdown
              components={{
                h3: ({ ...props }) => (
                  <h3 className="text-base font-extrabold text-white tracking-tight border-b border-zinc-800 pb-2 mt-6 mb-2 uppercase text-xs tracking-wider" {...props} />
                ),
                strong: ({ ...props }) => (
                  <strong className="font-bold text-white bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800 mx-0.5 text-[13px]" {...props} />
                ),
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <div className="rounded-xl overflow-hidden border border-zinc-800 my-4 shadow-xl">
                      <div className="bg-zinc-900 px-4 py-1.5 border-b border-zinc-800 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wide">{match[1]}</span>
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-zinc-700" />
                          <div className="w-2 h-2 rounded-full bg-zinc-700" />
                        </div>
                      </div>
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: '16px', background: '#09090b', fontSize: '13px' }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="bg-purple-950/40 text-purple-400 font-mono text-xs px-1.5 py-0.5 rounded border border-purple-500/10 font-bold mx-0.5" {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {aiResponse}
            </ReactMarkdown>
          </div>

        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto">
            <span className="text-3xl mb-2">🤖</span>
            <p className="text-sm text-zinc-500 font-semibold">Aguardando envio do código para iniciar o diagnóstico...</p>
          </div>
        )}
      </div>
    </div>

  </div>
)}

</div>
</main>
</div>
)
}