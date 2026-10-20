import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'lucide-react';
import TiltCard from './TiltCard';

export default function KnowledgeGraph() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);
    };
    resize();

    // Node definitions
    const nodes = [
      { id: 'core', label: 'Umar Adnan', x: 0.5, y: 0.5, radius: 13, color: '#ff0033', isCenter: true },
      { id: 'ai', label: 'AI & ML', x: 0.28, y: 0.32, radius: 9, color: '#ff2247' },
      { id: 'web', label: 'Full-Stack', x: 0.72, y: 0.32, radius: 9, color: '#e5e7eb' },
      { id: 'umt', label: 'CS @ UMT', x: 0.5, y: 0.20, radius: 8, color: '#ff0033' },
      { id: 'youtube', label: 'TeachmeROR', x: 0.24, y: 0.70, radius: 8, color: '#ff0033' },
      { id: 'internships', label: 'Internships', x: 0.74, y: 0.70, radius: 8, color: '#e5e7eb' },
      { id: 'pytorch', label: 'PyTorch', x: 0.15, y: 0.20, radius: 6, color: '#ff4d4d' },
      { id: 'sklearn', label: 'Scikit-Learn', x: 0.17, y: 0.46, radius: 6, color: '#ff4d4d' },
      { id: 'react', label: 'React 19', x: 0.85, y: 0.20, radius: 6, color: '#d1d5db' },
      { id: 'rails', label: 'Ruby on Rails', x: 0.82, y: 0.44, radius: 6, color: '#ff4d4d' },
      { id: 'cpp', label: 'C++ DSA', x: 0.5, y: 0.82, radius: 7, color: '#ff0033' },
      { id: 'demeta', label: 'Demeta', x: 0.88, y: 0.64, radius: 6, color: '#d1d5db' },
      { id: 'afynix', label: 'Afynix Digital', x: 0.86, y: 0.82, radius: 6, color: '#ff4d4d' },
    ];

    const links = [
      { from: 'core', to: 'ai' },
      { from: 'core', to: 'web' },
      { from: 'core', to: 'umt' },
      { from: 'core', to: 'youtube' },
      { from: 'core', to: 'internships' },
      { from: 'core', to: 'cpp' },
      { from: 'ai', to: 'pytorch' },
      { from: 'ai', to: 'sklearn' },
      { from: 'web', to: 'react' },
      { from: 'web', to: 'rails' },
      { from: 'youtube', to: 'rails' },
      { from: 'internships', to: 'demeta' },
      { from: 'internships', to: 'afynix' },
      { from: 'umt', to: 'cpp' },
    ];

    let t = 0;
    let lastRenderTime = 0;
    const targetFps = 45; // Smooth fast motion
    const interval = 1000 / targetFps;

    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastRenderTime;
      if (delta < interval) return;
      lastRenderTime = currentTime - (delta % interval);

      // Faster orbital speed as requested
      t += 0.055;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Translucent obsidian background to allow background motion through glass
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(10, 10, 14, 0.45)';
      ctx.fillRect(0, 0, w, h);

      // Background grid dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      const step = 32;
      for (let x = 16; x < w; x += step) {
        for (let y = 16; y < h; y += step) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }

      // Compute positions with dynamic faster amplitude
      const positions = {};
      nodes.forEach((n, idx) => {
        // Fast, energetic organic floating
        const floatX = n.isCenter ? Math.sin(t * 0.8) * 3 : Math.sin(t * 1.4 + idx * 1.5) * 12;
        const floatY = n.isCenter ? Math.cos(t * 0.9) * 3 : Math.cos(t * 1.2 + idx * 1.2) * 11;

        let posX = n.x * w + floatX;
        let posY = n.y * h + floatY;

        // Interactive mouse reaction: gently repel nodes near cursor
        const dx = posX - mousePos.current.x;
        const dy = posY - mousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100 * 18;
          posX += (dx / dist) * force;
          posY += (dy / dist) * force;
        }

        positions[n.id] = {
          x: posX,
          y: posY,
          radius: n.radius,
          color: n.color,
          label: n.label,
          isCenter: n.isCenter
        };
      });

      // Draw links
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      links.forEach((link) => {
        const p1 = positions[link.from];
        const p2 = positions[link.to];
        if (p1 && p2) {
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      });
      ctx.stroke();

      // Draw nodes
      Object.values(positions).forEach((p) => {
        // Pulse ring on center core
        if (p.isCenter) {
          const pulseR = p.radius + 4 + Math.sin(t * 2) * 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 0, 51, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Node circle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node label
        ctx.fillStyle = p.isCenter ? '#ffffff' : '#d4d4d8';
        ctx.font = p.isCenter ? 'bold 12px Space Grotesk, sans-serif' : '10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(p.label, p.x, p.y + p.radius + 14);
      });
    };

    animationFrameId = requestAnimationFrame(render);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div ref={containerRef}>
      <TiltCard className="rounded-3xl obsidian-card p-5 sm:p-6 relative overflow-hidden">
        
        {/* Top bar */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2 text-white">
            <Network className="w-4 h-4 text-[#ff0033]" />
            <span className="font-bold tracking-wider uppercase text-[11px]">Interactive Knowledge Graph</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-400">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ff0033] animate-pulse"></span>
            <span>Fast Node Motion</span>
          </div>
        </div>

        <div className="relative w-full h-[280px] sm:h-[350px] rounded-2xl bg-black/40 backdrop-blur-md overflow-hidden border border-white/10">
          <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

          {/* Legend */}
          <div className="absolute bottom-3 left-3 bg-[#111116]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#ff0033]"></span> Core & AI Nodes
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#e5e7eb]"></span> Full-Stack & Systems
            </span>
          </div>
        </div>

      </TiltCard>
    </div>
  );
}
