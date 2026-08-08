import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/audioSynth';

export function SpriteMascot({
  action = 'idle', // 'idle' | 'wave' | 'dance' | 'celebrate'
  size = 200,
  showSpeech = false,
  speechText = "Happy Birthday!",
  interactive = true,
  onClick = null,
  className = ''
}) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [bounce, setBounce] = useState(false);

  // Map actions to sprite sheet rows
  const ACTION_ROWS = {
    idle: 0,
    wave: 1,
    dance: 2,
    celebrate: 3
  };

  const currentRow = ACTION_ROWS[action] !== undefined ? ACTION_ROWS[action] : 0;

  useEffect(() => {
    // Frame animation timer (8 FPS for fluid mascot motion)
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % 4);
    }, 140);

    return () => clearInterval(interval);
  }, [action]);

  const handleClick = (e) => {
    setBounce(true);
    setTimeout(() => setBounce(false), 400);
    soundManager.playMascotCheer();
    if (onClick) {
      onClick(e);
    }
  };

  // Calculate background position offset
  // Sheet is 1024x1024, containing 4x4 grid of 256x256 frames
  const bgX = (currentFrame * 100) / 3;
  const bgY = (currentRow * 100) / 3;

  return (
    <div
      className={`mascot-container relative inline-flex flex-col items-center justify-center select-none py-2 ${interactive ? 'cursor-pointer' : ''} ${className}`}
      onClick={interactive ? handleClick : undefined}
      style={{ minWidth: size, maxWidth: '100%' }}
    >
      {/* Speech Bubble */}
      {showSpeech && (
        <div className="relative mb-3 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-md border-2 border-slate-500 text-xs font-bold text-slate-900 max-w-[220px] text-center leading-tight whitespace-normal break-words animate-bounce">
          {speechText}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-slate-500" />
        </div>
      )}

      {/* Mascot Sprite Display & Glow */}
      <div className="relative flex items-center justify-center">
        {/* Glow aura */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-40 transition-all duration-300 pointer-events-none"
          style={{
            background: action === 'celebrate' 
              ? 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,105,180,0.4) 70%)'
              : action === 'dance'
              ? 'radial-gradient(circle, rgba(0,210,255,0.8) 0%, rgba(160,100,255,0.4) 70%)'
              : 'radial-gradient(circle, rgba(255,182,193,0.8) 0%, rgba(255,240,245,0.2) 70%)'
          }}
        />

        <div
          className={`mascot-sprite transition-transform duration-200 ${bounce ? 'scale-110 -translate-y-3' : 'hover:scale-105'}`}
          style={{
            width: size,
            height: size,
            backgroundImage: `url('/assets/mascot_spritesheet.png')`,
            backgroundSize: '400% 400%',
            backgroundPosition: `${bgX}% ${bgY}%`,
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))'
          }}
        />
      </div>
    </div>
  );
}
