import React from 'react';
import { Youtube, Play, ExternalLink, Flame } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function CreatorHub() {
  const topics = [
    { title: "Ruby on Rails Architecture", desc: "MVC principles, Active Record, migrations, and clean routing workflows." },
    { title: "Full-Stack Development", desc: "Bridging back-end Rails and modern responsive front-end interfaces." },
    { title: "Algorithms & Problem Solving", desc: "Deconstructing core CS data structures and optimization techniques." },
  ];

  return (
    <section id="creator-hub" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Creator Hub Obsidian Card */}
        <TiltCard className="rounded-3xl sm:rounded-4xl obsidian-card p-6 sm:p-10 lg:p-12 hover-glow-red">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Creator Identity */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff0033]/15 border border-[#ff0033]/30 text-[#ff4d4d] text-xs font-mono font-semibold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-[#ff0033]" />
                <span>YouTube Creator Hub</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                TeachmeROR <br />
                <span className="text-[#ff0033]">
                  @teach_me_ror
                </span>
              </h2>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                Beyond building software, I run an educational YouTube channel dedicated to demystifying{' '}
                <strong className="text-white">Ruby on Rails</strong>, computer science fundamentals, and web development. Teaching is the ultimate test of understanding.
              </p>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {topics.map((t, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/10">
                    <div className="w-7 h-7 rounded-full bg-[#ff0033]/10 flex items-center justify-center mb-2">
                      <Play className="w-3.5 h-3.5 text-[#ff0033]" />
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1">{t.title}</h4>
                    <p className="text-[11px] text-zinc-400">{t.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href={personalInfo.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#ff0033] hover:bg-red-600 shadow-glow-red transition-all"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Subscribe on YouTube</span>
                </a>
                <span className="text-xs text-zinc-400 font-mono">
                  Join the developer learning journey!
                </span>
              </div>

            </div>

            {/* Right Column: Visual Video Preview Card */}
            <div className="lg:col-span-5">
              <TiltCard className="rounded-3xl bg-black/40 backdrop-blur-md p-5 border border-white/10 group">
                <div className="aspect-video rounded-2xl bg-black/60 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                  
                  <div className="relative z-10 flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-[#ff0033]/20 border border-[#ff0033]/50 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-[#ff0033] transition-all">
                      <Play className="w-5 h-5 text-[#ff0033] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-0.5">Showcase Channel</span>
                    <h3 className="text-sm font-bold text-white">Ruby on Rails Masterclasses</h3>
                  </div>

                  <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 text-[#ff4d4d]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff0033]"></span>
                      ACTIVE CHANNEL
                    </span>
                    <span>1080p HD</span>
                  </div>

                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">@teach_me_ror</h4>
                    <p className="text-[11px] text-zinc-400">Free developer guides</p>
                  </div>
                  <a
                    href={personalInfo.socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                    aria-label="Open TeachmeROR YouTube Channel"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </TiltCard>
            </div>

          </div>

        </TiltCard>

      </div>
    </section>
  );
}
