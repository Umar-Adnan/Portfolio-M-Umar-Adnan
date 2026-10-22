import React from 'react';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';
import { experience } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function Experience() {
  return (
    <section id="experience" aria-label="Professional Experience and Internships" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/30 text-[#ff4d4d] text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Experience & Internships
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm">
            Hands-on internships and community initiatives documented on LinkedIn.
          </p>
        </div>

        {/* Timeline with Curved Cards */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 space-y-8 sm:space-y-10">
          {experience.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline node bullet */}
              <div className="absolute -left-[7px] top-2 w-3.5 h-3.5 rounded-full border-2 border-[#ff0033] bg-[#080808] group-hover:bg-[#ff0033] transition-colors"></div>

              {/* Curved Card */}
              <TiltCard className="p-6 sm:p-7 rounded-3xl obsidian-card hover-glow-red">
                
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2.5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-white transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#ff4d4d]">
                      {item.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/[0.04] text-zinc-300 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </TiltCard>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
