import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  
  // Lista fictícia de módulos para renderizar na tela
  const [modules] = useState([
    { id: 1, title: 'Lógica de Programação e Algoritmos', status: 'Em andamento', progress: 65, color: 'border-emerald-500/30 text-emerald-400' },
    { id: 2, title: 'Desenvolvimento Web Full-Stack com Node.js', status: 'Não iniciado', progress: 0, color: 'border-zinc-800 text-zinc-400' },
    { id: 3, title: 'Estruturas de Dados Avançadas', status: 'Concluído', progress: 100, color: 'border-blue-500/30 text-blue-400' },
  ])

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="flex min-h-screen w-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
      
      {/* 1. Menu Lateral (Sidebar) */}
      <aside className="w-64 border-r border-zinc-900 bg-zinc-900/20 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <div className="px-2">
            <h2 className="text-xl font-black tracking-tight text-white">
              CodeStudy<span className="text-emerald-400">.AI</span>
            </h2>
          </div>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-emerald-400 border border-emerald-500/10">
              📊 Painel Geral
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 transition-colors">
              📚 Meus Cursos
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 transition-colors">
              🤖 Analisador IA
            </a>
          </nav>
        </div>

        {/* Botão de Sair */}
        <button 
          onClick={handleLogout}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 py-2 text-sm font-medium text-zinc-400 hover:bg-rose-950/20 hover:text-rose-400 hover:border-rose-500/20 transition-all duration-200"
        >
          Sair do Sistema
        </button>
      </aside>

      {/* 2. Área de Conteúdo Principal */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Cabeçalho (Topbar) */}
        <header className="h-16 border-b border-zinc-900 bg-zinc-950 px-8 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white tracking-tight">Painel de Estudos</h1>
          
          {/* Perfil do Aluno */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-zinc-400">Estudante</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-sm">
              U
            </div>
          </div>
        </header>

        {/* Corpo do Painel */}
        <div className="p-8 space-y-8 flex-1 overflow-y-auto">
          
          {/* Grid de Estatísticas Rápidas */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-900 bg-zinc-900/30 p-6 backdrop-blur-sm">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Horas de Estudo</p>
              <p className="mt-2 text-3xl font-bold text-white tracking-tight">24.5h</p>
            </div>
            <div className="rounded-xl border border-zinc-900 bg-zinc-900/30 p-6 backdrop-blur-sm">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Módulos Concluídos</p>
              <p className="mt-2 text-3xl font-bold text-white tracking-tight">1/3</p>
            </div>
            <div className="rounded-xl border border-zinc-900 bg-zinc-900/30 p-6 backdrop-blur-sm">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Análises de IA Restantes</p>
              <p className="mt-2 text-3xl font-bold text-emerald-400 tracking-tight">15</p>
            </div>
          </div>

          {/* Seção de Trilhas de Aprendizado */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Minha Trilha Acadêmica</h3>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((mod) => (
                <div 
                  key={mod.id} 
                  className={`flex flex-col justify-between rounded-xl border bg-zinc-900/10 p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.01] ${mod.color}`}
                >
                  <div>
                    <span className="inline-block rounded-full bg-zinc-950 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide border border-zinc-800">
                      {mod.status}
                    </span>
                    <h4 className="mt-4 font-bold text-white text-base leading-snug">{mod.title}</h4>
                  </div>

                  <div className="mt-8 space-y-2">
                    <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
                      <span>Progresso</span>
                      <span className="font-semibold text-zinc-300">{mod.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-950 overflow-hidden border border-zinc-900">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                        style={{ width: `${mod.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}