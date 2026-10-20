import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Youtube, Menu, X, Mail, MessageSquare } from 'lucide-react';
import { personalInfo, getWhatsAppApiUrl, getGmailComposeUrl } from '../data/portfolioData';
import { trackEvent } from '../utils/analytics';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'TeachmeROR', href: '#creator-hub' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#080808] border-b border-white/10 py-3 shadow-2xl transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo in Single Line: "M Umar Adnan" */}
          <a 
            href="#" 
            className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0"
            aria-label="Muhammad Umar Adnan Portfolio Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#ff0033]/10 border border-[#ff0033]/30 flex items-center justify-center group-hover:border-[#ff0033] transition-colors flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff0033]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
            
            <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap">
              <span className="font-mono font-bold tracking-tight text-[#ff0033] text-sm sm:text-base whitespace-nowrap">
                M Umar Adnan
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ff0033]/15 text-[#ff4d4d] border border-[#ff0033]/40 whitespace-nowrap">
                #OPENTOWORK
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#121216]/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-lg" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs lg:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* 1-Click WhatsApp & Gmail Buttons */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            
            {/* 1-Click WhatsApp API */}
            <a 
              href={getWhatsAppApiUrl()} 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => trackEvent('cta_whatsapp_click', { location: 'navbar' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff0033]/10 hover:bg-[#ff0033] text-[#ff4d4d] hover:text-white border border-[#ff0033]/40 hover:border-[#ff0033] transition-all text-xs font-mono font-semibold whitespace-nowrap"
              title="1-Click WhatsApp Chat (0300 4262838)"
              aria-label="Direct WhatsApp Chat with Umar"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* 1-Click Gmail Direct Web Composer */}
            <a 
              href={getGmailComposeUrl()} 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => trackEvent('cta_gmail_click', { location: 'navbar' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/10 hover:border-white/25 transition-all text-xs font-mono whitespace-nowrap"
              title="1-Click Gmail Direct Compose"
              aria-label="Compose email to Umar in Gmail"
            >
              <Mail className="w-3.5 h-3.5 text-[#ff0033]" />
              <span>Gmail</span>
            </a>

            <div className="w-[1px] h-5 bg-white/10 mx-1"></div>

            <a 
              href={personalInfo.socials.github} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
              title="GitHub Profile"
              aria-label="Umar Adnan GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href={personalInfo.socials.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
              title="LinkedIn Profile"
              aria-label="Umar Adnan LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-[#ff4d4d]" />
            </a>
            <a 
              href={personalInfo.socials.youtube} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-xl bg-[#ff0033]/10 hover:bg-[#ff0033]/20 text-[#ff0033] border border-[#ff0033]/30 transition-colors"
              title="TeachmeROR YouTube Channel"
              aria-label="TeachmeROR YouTube Channel"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white bg-[#121216] rounded-2xl border border-white/10"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-4 p-5 rounded-3xl obsidian-card shadow-2xl flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-zinc-200 hover:text-[#ff0033] hover:bg-white/5 rounded-2xl transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <div className="flex gap-2">
              <a
                href={getWhatsAppApiUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-mono font-bold bg-[#ff0033] text-white"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: {personalInfo.whatsappDisplay}</span>
              </a>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/5 text-zinc-300 hover:text-white" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/5 text-[#ff4d4d]" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={personalInfo.socials.youtube} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/5 text-[#ff0033]" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
