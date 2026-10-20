import React, { useState } from 'react';
import { Terminal, Copy, Check, BookOpen, GraduationCap, Laptop, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function About() {
  const [copied, setCopied] = useState(false);

  const developerJson = `{
  "name": "Muhammad Umar Adnan",
  "university": "University of Management and Technology (UMT)",
  "degree": "BS Computer Science",
  "location": "Lahore, Punjab, Pakistan",
  "status": "Available for Internships & Full-Time",
  "focusAreas": [
    "Full-Stack Web (MERN & Ruby on Rails)",
    "AI & Machine Learning (PyTorch & Scikit-Learn)",
    "Data Structures & Systems (C++)"
  ],
  "contentCreator": {
    "channel": "TeachmeROR",
    "mission": "Demystifying Ruby on Rails and Modern Web Architecture"
  },
  "motto": "Small steps every day lead to big results."
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(developerJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/30 text-[#ff4d4d] text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Bridging Theory & Scalable Code
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Narrative Card */}
          <div className="lg:col-span-6 space-y-5">
            <TiltCard className="p-6 sm:p-8 rounded-3xl obsidian-card hover-glow-red">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3.5 flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-[#ff0033]" />
                Computer Science @ UMT
              </h3>
              <p className="text-zinc-300 leading-relaxed mb-3 text-xs sm:text-sm">
                I am an aspiring software engineer studying Computer Science at the{' '}
                <strong className="text-white">University of Management and Technology (UMT)</strong> in Lahore. My focus unites core computational foundations—Data Structures, Algorithms, and OOP—with modern production frameworks.
              </p>
              <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
                Having completed internships in both <span className="text-[#ff4d4d] font-semibold">Front-End Development (Demeta)</span> and <span className="text-[#ff4d4d] font-semibold">Python Programming (Afynix Digital)</span>, I enjoy transforming analytical concepts into fast, deployed applications.
              </p>
            </TiltCard>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TiltCard className="p-5 rounded-2xl obsidian-card">
                <Laptop className="w-5 h-5 text-[#ff0033] mb-2.5" />
                <h4 className="text-sm font-bold text-white mb-1">Full-Stack Execution</h4>
                <p className="text-xs text-zinc-400">
                  Engineering web apps with modern React, TypeScript, Tailwind, and Ruby on Rails.
                </p>
              </TiltCard>

              <TiltCard className="p-5 rounded-2xl obsidian-card">
                <BookOpen className="w-5 h-5 text-[#ff0033] mb-2.5" />
                <h4 className="text-sm font-bold text-white mb-1">AI & Data Modeling</h4>
                <p className="text-xs text-zinc-400">
                  Building ML pipelines in Scikit-Learn and exploring deep learning architectures in PyTorch.
                </p>
              </TiltCard>
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal */}
          <div className="lg:col-span-6">
            <TiltCard className="rounded-3xl obsidian-card overflow-hidden shadow-2xl">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff0033]"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <span className="ml-2 font-mono text-xs text-zinc-400">profile.json</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#ff4d4d]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Terminal Code Body */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-zinc-300 overflow-x-auto leading-relaxed bg-black/30 backdrop-blur-sm">
                <pre>
                  <code>{developerJson}</code>
                </pre>
              </div>

              {/* Terminal Status Bar */}
              <div className="px-4 py-2 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff0033]"></span>
                  UTF-8 • JSON
                </span>
                <span>Branch: main</span>
              </div>

            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
