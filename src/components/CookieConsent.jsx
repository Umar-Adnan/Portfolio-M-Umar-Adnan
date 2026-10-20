import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export default function CookieConsent({ onOpenPrivacy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('umar_portfolio_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('umar_portfolio_cookie_consent', 'accepted');
    trackEvent('cookie_consent', { status: 'accepted' });
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('umar_portfolio_cookie_consent', 'essential_only');
    trackEvent('cookie_consent', { status: 'declined' });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="obsidian-card p-5 shadow-2xl">
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-9 h-9 rounded-xl bg-[#ff0033]/15 flex items-center justify-center text-[#ff0033] flex-shrink-0 border border-[#ff0033]/30">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Privacy & Cookies
            </h4>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              We use minimal local cookies and telemetry to measure page performance and optimize your viewing experience across devices.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 gap-2 text-xs font-mono">
          <button
            onClick={onOpenPrivacy}
            className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors"
          >
            Privacy Policy
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecline}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 text-xs transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-full bg-[#ff0033] hover:bg-red-600 text-white font-bold text-xs shadow-glow-red transition-all"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
