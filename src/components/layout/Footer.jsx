import React from 'react';
import { Heart, Sparkles, Cake } from 'lucide-react';
import { soundManager } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

export function Footer({ onNavigate }) {
  const handleEasterEgg = () => {
    soundManager.playConfettiPop();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.9 }
    });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Brand info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <img src="/assets/logo.png" alt="Logo" className="w-10 h-10 object-contain rounded-xl bg-white/10 p-1" />
            <span className="text-xl font-extrabold text-white tracking-wide">
              WishThemHappy 
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Create premium birthday wishing web experiences with interactive features, audio themes, custom images, and shareable cards.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex justify-center gap-6 text-sm font-bold">
          <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
            Home
          </button>
          <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
            Gallery
          </button>
          <button onClick={() => onNavigate('create')} className="hover:text-white transition-colors">
            Card Creator
          </button>
        </div>

        {/* Right side is now empty / cleaned up */}
        <div />

      </div>
    </footer>
  );
}
