import React from 'react';
import { Home, MessageSquare } from 'lucide-react';
import { getWhatsAppApiUrl } from '../data/portfolioData';

export default function NotFound({ onGoHome }) {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
      <div className="max-w-md w-full obsidian-card p-8 sm:p-10 text-center">
        
        <div className="w-16 h-16 rounded-3xl bg-[#ff0033]/10 border border-[#ff0033]/30 flex items-center justify-center mx-auto mb-6 text-[#ff0033]">
          <svg className="w-8 h-8 text-[#ff0033]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-[#ff0033] font-bold">
          Error 404 • Lost in Nodes
        </span>

        <h1 className="text-3xl font-extrabold text-white mt-2 mb-3">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8">
          The requested route or file does not exist in Muhammad Umar Adnan's digital repository.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onGoHome}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#ff0033] hover:bg-red-600 text-white shadow-glow-red transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </button>
          
          <a
            href={getWhatsAppApiUrl("Hi Umar, I hit a 404 on your portfolio site")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-mono text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#ff0033]" />
            <span>Report Broken Link</span>
          </a>
        </div>

      </div>
    </div>
  );
}
