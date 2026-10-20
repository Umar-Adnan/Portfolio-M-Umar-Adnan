import React from 'react';
import { ArrowRight, MapPin, Youtube, ExternalLink, MessageSquare, Mail } from 'lucide-react';
import { personalInfo, getWhatsAppApiUrl, getGmailComposeUrl } from '../data/portfolioData';
import { trackEvent } from '../utils/analytics';
import TiltCard from './TiltCard';
import PixelAvatar from './PixelAvatar';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Availability Badge */}
        <div className="flex justify-center lg:justify-start mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#121216]/80 backdrop-blur-md border border-[#ff0033]/30 hover:border-[#ff0033]/60 shadow-lg transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff0033]"></span>
            </span>
            <span className="text-xs sm:text-sm font-mono font-medium text-zinc-300">
              Open to Work: Full-Stack & AI Roles
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-zinc-400">
              <MapPin className="w-3 h-3 text-[#ff0033]" />
              Lahore (On-site / Hybrid / Remote)
            </span>
          </div>
        </div>

        {/* 2-Column Hero Layout: Text on Left, Pixel Avatar Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          
          {/* Left Column: Introduction & CTAs (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            <TiltCard className="p-6 sm:p-10 rounded-3xl sm:rounded-4xl obsidian-card relative">
              <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-zinc-400 mb-3">
                &lt;Software Engineering & AI Portfolio /&gt;
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#ff0033] mb-4">
                Hi, I'm <span>Muhammad</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0033] via-red-500 to-[#ff3366]">
                  Umar Adnan
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-zinc-300 font-medium leading-relaxed mb-6">
                Computer Science Student @ <span className="text-white font-bold">UMT</span>,{' '}
                building scalable <span className="text-white font-semibold">Full-Stack Web Systems</span> and training{' '}
                <span className="text-white font-semibold">AI & Machine Learning</span> pipelines.
              </p>

              {/* Philosophy Tagline */}
              <div className="inline-block px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
                <p className="text-xs sm:text-sm font-mono text-zinc-300">
                  "{personalInfo.tagline}" <span className="text-zinc-600">—</span>{' '}
                  <span className="text-[#ff0033] font-bold">CODE</span> /{' '}
                  <span className="text-zinc-200 font-bold">LEARN</span> /{' '}
                  <span className="text-[#ff0033] font-bold">BUILD</span>
                </p>
              </div>

              {/* High-Contrast CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                
                {/* WhatsApp Direct */}
                <a
                  href={getWhatsAppApiUrl()}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('cta_whatsapp_hero')}
                  className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#ff0033] hover:bg-red-600 shadow-glow-red hover:shadow-glow-red-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp: {personalInfo.whatsappDisplay}</span>
                </a>

                {/* Explore Projects */}
                <a
                  href="#projects"
                  className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-xs text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Gmail 1-Click */}
                <a
                  href={getGmailComposeUrl()}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('cta_gmail_hero')}
                  className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-xs text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#ff0033]" />
                  <span>Email Umar</span>
                </a>

                {/* TeachmeROR YouTube */}
                <a
                  href="#creator-hub"
                  className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-xs text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-[#ff0033]" />
                  <span>TeachmeROR</span>
                </a>

              </div>
            </TiltCard>

          </div>

          {/* Right Column: Pixel Avatar Card with 3D Tilt (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            
            <TiltCard className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-3xl sm:rounded-4xl obsidian-card text-center relative">
              
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center justify-between px-2">
                <span>IDENTITY MATRIX</span>
                <span className="text-[#ff4d4d] font-bold">UMAR ADNAN</span>
              </div>

              {/* Pixel Avatar Canvas */}
              <PixelAvatar />

              <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-left text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block text-[10px]">AFFILIATION</span>
                  <span className="text-white font-semibold">CS @ UMT Lahore</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">STACK</span>
                  <span className="text-[#ff4d4d] font-semibold">Full-Stack & AI</span>
                </div>
              </div>

            </TiltCard>

          </div>

        </div>

        {/* Quick Stats Curved Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto items-stretch">
          {personalInfo.stats.map((stat, idx) => (
            <TiltCard
              key={idx}
              className="p-4 sm:p-5 rounded-3xl obsidian-card text-center flex flex-col items-center justify-center h-full min-h-[110px] sm:min-h-[120px]"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-400 font-medium leading-snug min-h-[2rem] flex items-center justify-center">
                {stat.label}
              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
}
