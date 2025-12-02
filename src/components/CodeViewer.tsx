import React, { useState } from 'react';
import { GeneratedSite } from '../../types';
import { Check, Copy } from 'lucide-react';

interface CodeViewerProps {
  site: GeneratedSite;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ site }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    switch (activeTab) {
      case 'html': return site.html;
      case 'css': return site.css;
      case 'js': return site.javascript;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 border-b border-slate-700">
        <div className="flex space-x-2">
          {(['html', 'css', 'js'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === tab 
                  ? 'bg-brand-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-700 transition-colors"
          title="Copy code"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap">
          <code>{getCode()}</code>
        </pre>
      </div>
    </div>
  );
};