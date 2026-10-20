import React from 'react';
import { Layers } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/30 text-[#ff4d4d] text-xs font-mono uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Tech Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Technical Stack & Competencies
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm">
            Languages, architectures, machine learning frameworks, and infrastructure tools.
          </p>
        </div>

        {/* Categories Grid with Curved Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((cat, idx) => (
            <TiltCard
              key={idx}
              className="p-6 sm:p-8 rounded-3xl obsidian-card hover-glow-red"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff0033]"></span>
                  {cat.name}
                </h3>
                <span className="text-xs font-mono text-zinc-500">
                  {cat.items.length} Technologies
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="px-3.5 py-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] backdrop-blur-sm border border-white/10 hover:border-[#ff0033]/40 transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-[#ff4d4d] transition-colors">
                      {skill.name}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400">
                      {skill.level}
                    </div>
                  </div>
                ))}
              </div>

            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
}
