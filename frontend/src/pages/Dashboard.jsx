import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'
import AnalysisReport from '../components/AnalysisReport'

export default function Dashboard() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAnalyzeCode = async (e) => {
    e.preventDefault()
    if (!code.trim()) return
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setAiResponse(data.analysis)
    } catch {
      setAiResponse('### ❌ Erro\nFalha na análise.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#030712] text-zinc-100 font-sans overflow-hidden">
      <Toaster position="top-right" />

      {/* SIDEBAR */}
      <aside className="w-[300px] border-r border-white/5 bg-[#030712] flex flex-col z-30">
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]" />
            <div>
              <h1 className="text-lg font-bold text-white">CodeStudy AI</h1>
              <p className="text-[9px] uppercase tracking-widest text-zinc-400">Intelligent Code Analyzer</p>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl text-white">
              <span>⚡</span>
              <span className="text-sm font-medium">Analisador Principal</span>
            </div>
          </div>

          <button onClick={() => navigate('/')} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-all">
            <span>🚪</span> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 h-screen relative overflow-hidden">
        {/* VÍDEO NO FUNDO (Cores originais) */}
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/fundodash.mp4" type="video/mp4" />
          </video>
        </div>

        {/* CONTEÚDO */}
        <div className="relative z-10 flex flex-col h-full">
          {/* HEADER (Opaco para não ver o vídeo atrás) */}
          <header className="h-20 border-b border-white/10 flex items-center justify-between px-10 bg-[#030712] z-20">
            <div>
              <h2 className="text-lg font-bold">Analisador de Código</h2>
              <p className="text-xs text-zinc-500">Gemini AI • Análise Inteligente</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase font-bold text-green-400">Online</span>
            </div>
          </header>

          <div className="flex-1 p-10 overflow-y-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6">
              {/* TEXTAREA PRETO SÓLIDO */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[500px] bg-black border border-white/10 rounded-2xl p-8 font-mono text-sm text-zinc-300 focus:outline-none focus:border-blue-500/50 transition-all resize-none shadow-2xl"
                placeholder="// Cole seu código aqui..."
              />
              <button 
                onClick={handleAnalyzeCode}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white hover:shadow-lg transition-all"
              >
                {loading ? 'Analisando...' : 'Analisar Código'}
              </button>
            </motion.div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {aiResponse && <AnalysisReport content={aiResponse} onClose={() => setAiResponse('')} />}
      </AnimatePresence>
    </div>
  )
}