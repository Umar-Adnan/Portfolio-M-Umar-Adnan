import React, { useEffect, useRef } from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function LegalModal({ isOpen, type, onClose }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement;

    // Focus first focusable element inside modal
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Modal Accessibility: Escape to close and Tab focus trap
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusables = Array.from(
          modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xl rounded-3xl obsidian-card p-6 sm:p-8 border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors z-10"
          aria-label="Close modal dialog"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {type === 'privacy' ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#ff0033]/10 flex items-center justify-center text-[#ff0033] border border-[#ff0033]/30 shrink-0">
                <Shield className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 id="legal-modal-title" className="text-lg sm:text-xl font-bold text-white">
                  Privacy Policy
                </h3>
                <p className="text-[11px] font-mono text-zinc-400">Last updated: October 2026</p>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[58vh] sm:max-h-none pr-1 space-y-3 text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
              <p>
                Welcome to <strong>Muhammad Umar Adnan's</strong> portfolio (<span className="text-zinc-400">https://umaradnan.dev</span>). Your privacy is respected.
              </p>
              
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">1. Information We Collect</h4>
                <p className="text-zinc-400 mt-0.5">
                  Information you provide directly through contact inquiries (name, email, message) via Gmail or WhatsApp API.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">2. Cookies & Local Storage</h4>
                <p className="text-zinc-400 mt-0.5">
                  Stores your cookie preference locally (<code className="text-[#ff4d4d]">localStorage</code>). Zero third-party marketing or tracking cookies are used.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">3. How Information is Used</h4>
                <p className="text-zinc-400 mt-0.5">
                  Exclusively to respond to your technical questions, project opportunities, or recruitment discussions. Data is never sold or shared.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">4. Contact & Inquiries</h4>
                <p className="text-zinc-400 mt-0.5">
                  Direct inquiries to: <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-[#ff4d4d] font-mono underline underline-offset-2 transition-colors">{personalInfo.email}</a>.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#ff0033]/10 flex items-center justify-center text-[#ff0033] border border-[#ff0033]/30 shrink-0">
                <FileText className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 id="legal-modal-title" className="text-lg sm:text-xl font-bold text-white">
                  Terms of Service
                </h3>
                <p className="text-[11px] font-mono text-zinc-400">Last updated: October 2026</p>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[58vh] sm:max-h-none pr-1 space-y-3 text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
              <p>
                By visiting and exploring this portfolio, you agree to the following terms:
              </p>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">1. Intellectual Property</h4>
                <p className="text-zinc-400 mt-0.5">
                  Designs, code demos, write-ups, and portfolio branding are the intellectual property of Muhammad Umar Adnan, except open-source code under MIT license.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">2. Accuracy of Credentials</h4>
                <p className="text-zinc-400 mt-0.5">
                  All certificates, academic records from UMT, and industry work experience reflect genuine, verifiable qualifications.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">3. External Links</h4>
                <p className="text-zinc-400 mt-0.5">
                  External links (GitHub, LinkedIn, YouTube, WhatsApp) connect to third-party services governed by their respective policies.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-[#ff0033] hover:bg-red-600 text-white transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
