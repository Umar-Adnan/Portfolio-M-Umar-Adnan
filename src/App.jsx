import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import KnowledgeGraph from './components/KnowledgeGraph';
import Projects from './components/Projects';
import CreatorHub from './components/CreatorHub';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import LegalModal from './components/LegalModal';
import NotFound from './components/NotFound';
import CustomCursor from './components/CustomCursor';
import ParticlesBackground from './components/ParticlesBackground';
import { initDynamicTitle } from './utils/dynamicTitle';

export default function App() {
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: 'privacy' });
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    // Initialize dynamic browser title with Umar Adnan's name
    initDynamicTitle();

    // Check for #/404 route
    const checkHash = () => {
      setIs404(window.location.hash === '#/404');
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  if (is404) {
    return (
      <NotFound
        onGoHome={() => {
          window.location.hash = '';
          setIs404(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 relative selection:bg-[#ff0033]/30 selection:text-white">
      {/* Custom Dual-State Red/Black Cursor */}
      <CustomCursor />

      {/* High-Performance Red/Crimson Particles.js Background */}
      <ParticlesBackground />

      <Navbar />

      <main id="main-content" className="relative z-10">
        <Hero />
        
        {/* About & Knowledge Graph */}
        <About />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <KnowledgeGraph />
        </div>

        <Projects />
        <CreatorHub />
        <Experience />
        <Certificates />
        <Skills />
        <Contact />
      </main>

      <Footer
        onOpenPrivacy={() => setLegalModal({ isOpen: true, type: 'privacy' })}
        onOpenTerms={() => setLegalModal({ isOpen: true, type: 'terms' })}
      />

      <CookieConsent
        onOpenPrivacy={() => setLegalModal({ isOpen: true, type: 'privacy' })}
      />

      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={() => setLegalModal({ isOpen: false, type: 'privacy' })}
      />

      <Analytics />
    </div>
  );
}
