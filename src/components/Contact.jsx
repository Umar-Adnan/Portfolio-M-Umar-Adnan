import React, { useState } from 'react';
import { Mail, MapPin, Send, Linkedin, Github, Youtube, MessageSquare, ExternalLink, Sparkles, CheckCircle } from 'lucide-react';
import { personalInfo, getWhatsAppApiUrl, getGmailComposeUrl } from '../data/portfolioData';
import { trackEvent } from '../utils/analytics';
import TiltCard from './TiltCard';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    trackEvent('contact_form_submit', { subject: formData.subject });
    const gmailUrl = getGmailComposeUrl(
      formData.subject || ('Portfolio Inquiry from ' + formData.name),
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.open(gmailUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" aria-label="Contact and Inquiries" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/30 text-[#ff4d4d] text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Communication</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Connect Via 1-Click Channels
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm">
            Reach me instantly on WhatsApp via API, open a direct Gmail compose tab, or send an inquiry below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Direct Channels Curved Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 1-Click WhatsApp Card */}
            <TiltCard className="rounded-3xl obsidian-card hover-glow-red border border-[#ff0033]/40 group">
              <a
                href={getWhatsAppApiUrl()}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('cta_whatsapp_contact_card')}
                className="block p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#ff0033]/15 flex items-center justify-center text-[#ff0033] border border-[#ff0033]/30 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#ff0033]/15 text-[#ff4d4d] border border-[#ff0033]/30 font-semibold">
                    1-Click WhatsApp API
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">WhatsApp Direct Chat</h4>
                <p className="text-xs text-zinc-400 mb-2">
                  Launch chat directly to <strong>{personalInfo.whatsappDisplay}</strong> with pre-filled greeting.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff4d4d]">
                  Chat Now on WhatsApp <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>
            </TiltCard>

            {/* 1-Click Gmail Card */}
            <TiltCard className="rounded-3xl obsidian-card hover-glow-red group">
              <a
                href={getGmailComposeUrl()}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('cta_gmail_contact_card')}
                className="block p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-200 border border-white/10 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 text-[#ff0033]" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                    1-Click Web
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">Compose in Gmail</h4>
                <p className="text-xs text-zinc-400 mb-2">
                  Opens directly in Gmail web composer with recipient & subject pre-configured.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-200">
                  Open Gmail Composer <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>
            </TiltCard>

            {/* Location & Social Row */}
            <TiltCard className="p-6 rounded-3xl obsidian-card">
              <div className="flex items-center gap-3 mb-4 text-xs font-mono text-zinc-400">
                <MapPin className="w-4 h-4 text-[#ff0033]" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#ff4d4d]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 text-[#ff0033]" />
                  <span>YouTube</span>
                </a>
              </div>
            </TiltCard>

          </div>

          {/* Curved Interactive Form */}
          <div className="lg:col-span-7">
            <TiltCard className="p-6 sm:p-8 lg:p-10 rounded-3xl obsidian-card">
              
              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <CheckCircle className="w-12 h-12 text-[#ff4d4d] mx-auto animate-bounce" />
                  <h3 className="text-xl font-bold text-white">Gmail Tab Initialized!</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                    Your inquiry is queued. If popups are disabled, email directly at{' '}
                    <strong className="text-white">{personalInfo.email}</strong> or message on WhatsApp at{' '}
                    <strong className="text-white">{personalInfo.whatsappDisplay}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-mono uppercase bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Hiring Manager"
                        className="w-full px-4 py-3 rounded-2xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff0033] text-xs sm:text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="hiring@company.com"
                        className="w-full px-4 py-3 rounded-2xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff0033] text-xs sm:text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Inquiry / Job Opportunity"
                      className="w-full px-4 py-3 rounded-2xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff0033] text-xs sm:text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Umar, I reviewed your portfolio and would like to discuss..."
                      className="w-full px-4 py-3 rounded-2xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff0033] text-xs sm:text-sm transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-[#ff0033] hover:bg-red-600 shadow-glow-red flex items-center justify-center gap-2 transition-all uppercase tracking-wider font-mono"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send via Gmail 1-Click</span>
                  </button>
                </form>
              )}

            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
