import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';

export default function CodeBlock({ inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : 'text';
  
  if (inline) return <code className="bg-zinc-800 px-1 py-0.5 rounded text-sm text-zinc-200">{children}</code>;

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-zinc-700 shadow-md">
      <div className="flex justify-between items-center px-4 py-2 bg-zinc-900 border-b border-zinc-700">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{lang}</span>
        <CopyToClipboard text={String(children).replace(/\n$/, '')} onCopy={() => toast.success('Código copiado!')}>
          <button className="text-xs text-zinc-400 hover:text-white transition-colors">Copiar Código</button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter style={vscDarkPlus} language={lang} PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
}