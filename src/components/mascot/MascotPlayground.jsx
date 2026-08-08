import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SpriteMascot } from './SpriteMascot';
import { soundManager } from '../../utils/audioSynth';
import { Sparkles, Music, PartyPopper, Cake, Hand } from 'lucide-react';

export function MascotPlayground({ onStartWish }) {
  const [action, setAction] = useState('idle');
  const [speech, setSpeech] = useState("Hi there! Let's celebrate birthdays together!");

  const handleActionChange = (newAction, text) => {
    setAction(newAction);
    setSpeech(text);

    if (newAction === 'celebrate') {
      soundManager.playConfettiPop();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else if (newAction === 'dance') {
      soundManager.playMascotCheer();
    } else if (newAction === 'wave') {
      soundManager.playTone(600, 'sine', 0.2, 0.2);
    }
  };

  const handleFeedCake = () => {
    setAction('celebrate');
    setSpeech("Yummm! Delicious birthday cake! Thank you!");
    soundManager.playConfettiPop();
    confetti({
      particleCount: 60,
      spread: 60,
      colors: ['#ff69b4', '#ffd700', '#00bfff']
    });
    setTimeout(() => setAction('idle'), 2500);
  };

  return (
    <div className="mascot-playground-card glass-panel rounded-3xl p-6 md:p-8 max-w-2xl mx-auto shadow-2xl border border-white/40 relative overflow-hidden my-8">
      {/* Dynamic Background Effect */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-yellow-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 text-xs font-bold uppercase tracking-widest border border-pink-200">
          <Sparkles className="w-3.5 h-3.5" /> Animated Companion
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-2">
          Your Animated Celebration Companion!
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          Click them or choose an action below to see their reactions!
        </p>
      </div>

      {/* Center Mascot Display */}
      <div className="py-6 flex flex-col items-center justify-center min-h-[260px]">
        <SpriteMascot
          action={action}
          size={220}
          showSpeech={true}
          speechText={speech}
          interactive={true}
        />
      </div>

      {/* Action Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <button
          onClick={() => handleActionChange('idle', "Floating around enjoying the party atmosphere...")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl font-bold text-xs md:text-sm transition-all ${
            action === 'idle'
              ? 'bg-slate-900 text-white shadow-lg scale-105'
              : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200 shadow-sm'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Idle Float
        </button>

        <button
          onClick={() => handleActionChange('wave', "Hello friend! Welcome to the Birthday Wishing Hub!")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl font-bold text-xs md:text-sm transition-all ${
            action === 'wave'
              ? 'bg-slate-900 text-white shadow-lg scale-105'
              : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200 shadow-sm'
          }`}
        >
          <Hand className="w-4 h-4" /> Wave Hello
        </button>

        <button
          onClick={() => handleActionChange('dance', "Grooving to the birthday beat!")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl font-bold text-xs md:text-sm transition-all ${
            action === 'dance'
              ? 'bg-slate-900 text-white shadow-lg scale-105'
              : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200 shadow-sm'
          }`}
        >
          <Music className="w-4 h-4" /> Party Dance
        </button>

        <button
          onClick={() => handleActionChange('celebrate', "WOOO! Happy Birthday! Confetti blast!")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl font-bold text-xs md:text-sm transition-all ${
            action === 'celebrate'
              ? 'bg-slate-900 text-white shadow-lg scale-105'
              : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200 shadow-sm'
          }`}
        >
          <PartyPopper className="w-4 h-4" /> Confetti
        </button>
      </div>

      {/* Extra Interactive Triggers */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-200/60">
        <button
          onClick={handleFeedCake}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
        >
          <Cake className="w-4 h-4 text-slate-500" /> Feed Birthday Cake
        </button>

        {onStartWish && (
          <button
            onClick={onStartWish}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs md:text-sm shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Create A Wish Card Now
          </button>
        )}
      </div>
    </div>
  );
}
