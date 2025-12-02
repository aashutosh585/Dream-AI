import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Code, Download, Eye, Loader2, Send, Sparkles, Monitor, Smartphone, Tablet, Bot, User, Maximize2, Minimize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateWebsite, updateWebsite } from '../services/geminiService';
import { GeneratedSite, ViewMode, ChatMessage } from '../../types';
import { PreviewFrame } from './PreviewFrame';
import { CodeViewer } from './CodeViewer';

export const BuilderPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.PREVIEW);
  const [previewWidth, setPreviewWidth] = useState<'100%' | '768px' | '375px'>('100%');
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', content: prompt, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setPrompt('');
    setIsGenerating(true);

    try {
      let site: GeneratedSite;
      
      if (!generatedSite) {
        // First generation
        site = await generateWebsite(userMsg.content);
      } else {
        // Iterative update
        site = await updateWebsite(generatedSite, userMsg.content);
      }

      setGeneratedSite(site);
      setMessages(prev => [...prev, {
        role: 'model',
        content: site.explanation || (generatedSite ? "I've updated the website based on your request." : "I've created your website. How does it look?"),
        timestamp: Date.now()
      }]);
      setViewMode(ViewMode.PREVIEW);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'model',
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const handleDownload = () => {
    if (!generatedSite) return;

    const downloadFile = (filename: string, content: string, type: string) => {
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    downloadFile('index.html', generatedSite.html, 'text/html');
    downloadFile('style.css', generatedSite.css, 'text/css');
    downloadFile('script.js', generatedSite.javascript, 'text/javascript');
  };

  // --- INITIAL VIEW (HERO INPUT) ---
  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-screen bg-slate-950 text-slate-200">
        <header className="h-16 px-6 flex items-center border-b border-slate-800/50 shrink-0 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full p-6 pt-12 pb-24 flex flex-col items-center animate-in fade-in duration-700">
            <div className="mb-8 text-center space-y-4">
               <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 mb-4 shadow-xl shadow-brand-900/40">
                  <Sparkles size={32} className="text-white" />
               </div>
               <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                 What would you like to build?
               </h1>
               <p className="text-slate-400 text-lg">
                 Describe your idea in plain English, and I'll code it for you.
               </p>
            </div>

            <div className="w-full relative group mb-12">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                 <textarea
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                   onKeyDown={handleKeyDown}
                   placeholder="e.g. A portfolio for a photographer with a dark minimalist theme and a masonry image grid..."
                   className="w-full h-32 bg-transparent p-6 text-lg text-white placeholder-slate-500 outline-none resize-none"
                   autoFocus
                 />
                 <div className="bg-slate-800/50 px-4 py-3 flex justify-between items-center border-t border-slate-700/50">
                   <span className="text-xs text-slate-500 font-medium hidden sm:block">Press Enter to generate</span>
                   <button
                     onClick={handleGenerate}
                     disabled={!prompt.trim() || isGenerating}
                     className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                     Generate Website
                   </button>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full opacity-60">
               <SuggestionCard 
                 title="Coffee Shop" 
                 desc="Warm colors, menu grid, location map"
                 onClick={() => setPrompt("A cozy coffee shop website with warm brown tones, a hero section with a coffee image, a menu grid section, and a footer with location info.")}
               />
               <SuggestionCard 
                 title="SaaS Landing Page" 
                 desc="Modern, blue gradient, pricing table"
                 onClick={() => setPrompt("A modern SaaS landing page with a blue gradient theme, feature cards, a pricing comparison table, and a newsletter signup form.")}
               />
               <SuggestionCard 
                 title="Personal Portfolio" 
                 desc="Dark mode, project gallery, contact form"
                 onClick={() => setPrompt("A personal portfolio website for a developer in dark mode. Include an 'About Me' section, a grid of project cards, and a contact form.")}
               />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- SPLIT VIEW (CHAT + PREVIEW) ---
  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Top Header */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <span className="font-semibold text-sm md:text-base text-slate-200">SiteGen Builder</span>
        </div>

        <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800">
          <button
            onClick={() => setViewMode(ViewMode.PREVIEW)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === ViewMode.PREVIEW ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye size={14} /> Preview
          </button>
          <button
            onClick={() => setViewMode(ViewMode.CODE)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === ViewMode.CODE ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code size={14} /> Code
          </button>
        </div>

        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-medium transition-colors shadow-lg shadow-brand-900/20"
        >
          <Download size={14} />
          <span className="hidden sm:inline">Download</span>
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: CHAT */}
        <div className="w-80 md:w-96 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 z-10">
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-slate-700' : 'bg-brand-600'
                }`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 text-slate-200 rounded-tr-none' 
                    : 'bg-brand-900/20 border border-brand-800/30 text-slate-300 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center shrink-0 animate-pulse">
                  <Bot size={14} />
                </div>
                <div className="bg-brand-900/20 border border-brand-800/30 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin text-brand-400" />
                  <span className="text-xs text-brand-400 font-medium">Coding changes...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask for changes (e.g. 'Make the buttons red')"
                disabled={isGenerating}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 placeholder-slate-500"
              />
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-brand-600 text-white rounded-lg disabled:opacity-50 hover:bg-brand-500 transition-colors"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: WORKSPACE */}
        <div className={`${isFullScreen ? 'fixed inset-0 z-50' : 'flex-1 relative'} bg-slate-950 flex flex-col min-w-0 transition-all duration-300`}>
          {/* Device Toggles (Preview Mode Only) */}
          {viewMode === ViewMode.PREVIEW && (
             <div className="h-12 flex items-center justify-center border-b border-slate-800/50 bg-slate-950/50 backdrop-blur shrink-0 relative">
                <div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-800 items-center">
                   <button 
                    onClick={() => setPreviewWidth('100%')}
                    className={`p-1.5 rounded-md transition-all ${previewWidth === '100%' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    title="Desktop"
                   >
                     <Monitor size={16} />
                   </button>
                   <button 
                    onClick={() => setPreviewWidth('768px')}
                    className={`p-1.5 rounded-md transition-all ${previewWidth === '768px' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    title="Tablet"
                   >
                     <Tablet size={16} />
                   </button>
                   <button 
                    onClick={() => setPreviewWidth('375px')}
                    className={`p-1.5 rounded-md transition-all ${previewWidth === '375px' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    title="Mobile"
                   >
                     <Smartphone size={16} />
                   </button>
                   
                   <div className="w-px h-4 bg-slate-700 mx-2"></div>
                   
                   <button
                     onClick={() => setIsFullScreen(!isFullScreen)}
                     className={`p-1.5 rounded-md transition-all ${isFullScreen ? 'bg-slate-800 text-brand-400' : 'text-slate-500 hover:text-slate-300'}`}
                     title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                   >
                     {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                   </button>
                </div>
             </div>
          )}

          <div className="flex-1 overflow-hidden relative bg-slate-900/30">
             {viewMode === ViewMode.PREVIEW ? (
               <div className="w-full h-full flex justify-center overflow-y-auto overflow-x-hidden p-4 md:p-8">
                 <div 
                  className="transition-all duration-300 ease-in-out h-full shadow-2xl origin-top"
                  style={{ width: previewWidth }}
                 >
                    <PreviewFrame 
                      site={generatedSite} 
                      className={generatedSite ? "h-full bg-white" : "h-full opacity-50"}
                    />
                 </div>
               </div>
             ) : (
               <div className="w-full h-full p-4">
                 {generatedSite && <CodeViewer site={generatedSite} />}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SuggestionCard: React.FC<{title: string, desc: string, onClick: () => void}> = ({ title, desc, onClick }) => (
  <button 
    onClick={onClick}
    className="text-left p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 hover:bg-slate-800 transition-all group"
  >
    <h3 className="text-sm font-semibold text-slate-300 group-hover:text-brand-400 mb-1">{title}</h3>
    <p className="text-xs text-slate-500 line-clamp-2">{desc}</p>
  </button>
);