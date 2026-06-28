import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';
import { toast } from 'react-hot-toast';

export default function AnalysisReport({ content, onClose }) {
  const handleCopyReport = () => {
    navigator.clipboard.writeText(content);
    toast.success('Relatório copiado com sucesso.');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
        className="bg-zinc-50 w-full max-w-[850px] max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-900"
      >
        <header className="px-8 py-6 border-b border-zinc-200 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">Relatório de Análise da IA</h2>
            <p className="text-sm text-zinc-500">Gerado automaticamente pelo CodeStudy AI</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCopyReport} className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-sm font-semibold transition-colors">Copiar Relatório</button>
            <button onClick={onClose} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-semibold transition-colors">Fechar</button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-12 text-zinc-800">
          <div className="prose prose-zinc max-w-none">
            <ReactMarkdown components={{ code: CodeBlock }} remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}