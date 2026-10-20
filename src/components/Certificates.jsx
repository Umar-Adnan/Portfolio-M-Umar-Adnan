import React, { useState } from 'react';
import { Award, ShieldCheck, Download, X, FileText } from 'lucide-react';
import { certificates } from '../data/portfolioData';
import { trackEvent } from '../utils/analytics';
import TiltCard from './TiltCard';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  const handleDownload = (cert) => {
    trackEvent('download_certificate', { certId: cert.id, title: cert.title });
    const link = document.createElement('a');
    link.href = cert.downloadUrl;
    link.download = cert.downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="certificates" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/30 text-[#ff4d4d] text-xs font-mono uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Licenses & Certifications
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm">
            Click any certificate card to inspect details or click <span className="text-[#ff4d4d] font-semibold">Download</span> to receive the original certificate file.
          </p>
        </div>

        {/* Certifications Grid with Clean Minimal Curved Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {certificates.map((cert) => (
            <TiltCard
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="p-6 sm:p-7 rounded-3xl obsidian-card flex flex-col justify-between cursor-pointer group hover-glow-red"
            >
              <div>
                <div className="flex items-center justify-between mb-4 text-xs font-mono">
                  <span className="text-zinc-400 font-medium">
                    {cert.issueDate}
                  </span>
                  <span className="text-zinc-500 text-[11px]">
                    ID: {cert.credentialId}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#ff4d4d] transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs font-semibold text-zinc-300 mb-3">
                  {cert.issuer}
                </p>

                <p className="text-xs text-zinc-400 line-clamp-3 mb-6 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-400 group-hover:text-white transition-colors font-mono flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#ff0033]" />
                  <span>View Details</span>
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(cert);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#ff0033]/15 hover:bg-[#ff0033] text-[#ff4d4d] hover:text-white transition-all shadow-sm"
                  title="Download original certificate file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>

            </TiltCard>
          ))}
        </div>

      </div>

      {/* Clean Minimal Certificate Inspection Modal (No Image Preview) */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" role="dialog">
          <div className="relative w-full max-w-xl rounded-3xl obsidian-card p-6 sm:p-8 border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors z-10"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#ff0033]/10 border border-[#ff0033]/30 flex items-center justify-center text-[#ff0033] shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {selectedCert.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  {selectedCert.issuer}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6 bg-black/40 p-4 rounded-2xl border border-white/5 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-zinc-500 block">Recipient:</span>
                  <span className="text-white font-semibold">{selectedCert.recipient}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Issuing Body:</span>
                  <span className="text-white font-semibold">{selectedCert.issuer}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Date Issued:</span>
                  <span className="text-white font-semibold">{selectedCert.issueDate}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Credential ID:</span>
                  <span className="text-[#ff4d4d] font-semibold">{selectedCert.credentialId}</span>
                </div>
              </div>

              <p className="text-zinc-300 font-sans text-xs pt-3 border-t border-white/5 leading-relaxed">
                {selectedCert.description}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded-full text-xs font-mono text-zinc-400 hover:text-white bg-white/5 transition-colors"
              >
                Close
              </button>
              
              <button
                onClick={() => handleDownload(selectedCert)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider text-white bg-[#ff0033] hover:bg-red-600 shadow-glow-red transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Original Certificate</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
