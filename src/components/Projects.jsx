import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, Code, Cpu, Globe } from 'lucide-react';
import { projects } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const categories = [
    { key: 'all', label: 'All Projects', count: projects.length },
    { key: 'web', label: 'Full-Stack & Web', icon: Globe },
    { key: 'ai', label: 'AI & Data Science', icon: Cpu },
    { key: 'systems', label: 'C++ & Algorithms', icon: Code },
  ];

  return (
    <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/30 text-[#ff4d4d] text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Featured Projects & Pipelines
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-xs sm:text-sm">
            Curated engineering repositories spanning Full-Stack Web, Deep Learning models, and C++ algorithm simulations. Hover to experience 3D tilt.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = filter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#ff0033] text-white font-bold shadow-glow-red scale-105'
                    : 'bg-[#121216]/70 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid with TiltCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              className="rounded-3xl p-6 sm:p-7 obsidian-card flex flex-col justify-between hover-glow-red group"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#ff0033]/15 text-[#ff4d4d] border border-[#ff0033]/30 font-semibold">
                    {project.badge}
                  </span>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                    title="View GitHub Repository"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-[#ff4d4d] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tech Pills & Repo Link */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] text-zinc-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-mono text-[#ff4d4d] hover:text-white transition-colors"
                >
                  <span>Inspect Code</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
}
