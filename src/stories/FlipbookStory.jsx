import React, { useState } from 'react';
import { SpriteMascot } from '../components/mascot/SpriteMascot';
import { ImageWithLoader } from '../components/common/ImageWithLoader';
import { soundManager } from '../utils/audioSynth';
import { ChevronLeft, ChevronRight, BookOpen, Music, Flame, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function FlipbookStory({
  recipientName = 'Sapthesh',
  senderName = 'With love & best wishes',
  message = 'Wishing you an extraordinary birthday filled with endless joy, magic, and unforgettable adventures!',
  age = '25',
  polaroidPhoto = '',
  polaroidCaption = '',
  polaroidPhotos = [],
  polaroidCaptions = [],
  onComplete
}) {
  const [flippedSheets, setFlippedSheets] = useState([false, false, false]);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleNextPage = () => {
    const nextSheets = [...flippedSheets];
    const firstUnflippedIdx = nextSheets.findIndex(f => !f);
    if (firstUnflippedIdx !== -1) {
      nextSheets[firstUnflippedIdx] = true;
      setFlippedSheets(nextSheets);
      soundManager.playMascotCheer();
    }
  };

  const handlePrevPage = () => {
    const nextSheets = [...flippedSheets];
    let lastFlippedIdx = -1;
    for (let i = nextSheets.length - 1; i >= 0; i--) {
      if (nextSheets[i]) {
        lastFlippedIdx = i;
        break;
      }
    }
    if (lastFlippedIdx !== -1) {
      nextSheets[lastFlippedIdx] = false;
      setFlippedSheets(nextSheets);
      soundManager.playConfettiPop();
    }
  };

  const handleBlowOut = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    soundManager.playCandleBlow();
    soundManager.playConfettiPop();
    confetti({ particleCount: 120, spread: 90 });
    if (onComplete) onComplete();
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      soundManager.stopMelody();
      setIsPlayingMusic(false);
    } else {
      soundManager.startBirthdayMelody();
      setIsPlayingMusic(true);
    }
  };

  const flippedCount = flippedSheets.filter(Boolean).length;
  
  // Calculate page text helper
  let pageDisplay = "Cover";
  if (flippedCount === 1) {
    pageDisplay = "Pages 1-2";
  } else if (flippedCount === 2) {
    pageDisplay = "Pages 3-4";
  } else if (flippedCount === 3) {
    pageDisplay = "Back Cover";
  }

  // Shift book container dynamically to center the visible pages
  let bookShift = 'translateX(80px)';
  if (flippedCount === flippedSheets.length) {
    bookShift = 'translateX(-80px)';
  } else if (flippedCount > 0) {
    bookShift = 'translateX(0px)';
  }

  // Handle list of photos with backward compatibility fallbacks
  let displayPhotos = polaroidPhotos || [];
  let displayCaptions = polaroidCaptions || [];

  if (displayPhotos.length === 0) {
    if (polaroidPhoto) {
      displayPhotos = [polaroidPhoto];
      displayCaptions = [polaroidCaption || 'Sweet Memories!'];
    } else {
      displayPhotos = ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=300&q=80'];
      displayCaptions = ['Sparkling Birthday Celebration!'];
    }
  }

  return (
    <div className="flex flex-col items-center py-6 px-2 w-full max-w-5xl mx-auto">
      <style>{`
        .book-viewport {
          perspective: 1500px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 520px;
          margin: 0 auto;
        }
        .book-container-3d {
          position: relative;
          width: 320px;
          height: 460px;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          transform: scale(var(--book-scale)) var(--book-shift);
        }
        .book-sheet-3d {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          transform-style: preserve-3d;
          transform-origin: left center;
          transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        .book-page-face-3d {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          backface-visibility: hidden;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
          box-sizing: border-box;
          overflow: hidden;
          border: 1px solid rgba(217, 119, 6, 0.15);
        }
        .book-page-front-3d {
          z-index: 2;
          background: linear-gradient(to right, #fdfbf7 94%, #eae5d3 100%);
        }
        .book-page-back-3d {
          z-index: 1;
          transform: rotateY(180deg);
          background: linear-gradient(to left, #fdfbf7 94%, #eae5d3 100%);
        }
        
        :root {
          --book-scale: 1.1;
        }
        @media (max-width: 768px) {
          :root {
            --book-scale: 0.9;
          }
        }
        @media (max-width: 640px) {
          :root {
            --book-scale: 0.72;
          }
        }
        @media (max-width: 480px) {
          :root {
            --book-scale: 0.56;
          }
        }
        @media (max-width: 380px) {
          :root {
            --book-scale: 0.48;
          }
        }
      `}</style>

      {/* Flipbook Header Controls */}
      <div className="w-full flex items-center justify-between bg-amber-900/90 text-amber-100 p-4 rounded-2xl mb-6 shadow-xl border border-amber-700/50">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span className="font-serif font-bold text-sm sm:text-base">
            3D Birthday Storybook ({pageDisplay})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-transform hover:scale-105 ${
              isPlayingMusic ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-800 text-amber-200 hover:bg-amber-700'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>{isPlayingMusic ? 'Music Playing' : 'Play Music'}</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevPage}
              disabled={flippedCount === 0}
              className="p-2 rounded-xl bg-amber-800 hover:bg-amber-700 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={flippedCount === flippedSheets.length}
              className="p-2 rounded-xl bg-amber-800 hover:bg-amber-700 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D PageFlip Container */}
      <div className="book-viewport">
        <div 
          className="book-container-3d"
          style={{ 
            '--book-shift': bookShift,
            transform: 'scale(var(--book-scale)) var(--book-shift)'
          }}
        >
          
          {/* SHEET 0 */}
          <div 
            className="book-sheet-3d"
            style={{ 
              transform: flippedSheets[0] ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              zIndex: flippedSheets[0] ? 1 : 3
            }}
          >
            {/* Front: Page 0 (Cover) */}
            <div 
              className="book-page-face-3d book-page-front-3d cursor-pointer select-none bg-gradient-to-br from-amber-900 via-amber-800 to-rose-950 text-amber-100 border-4 border-amber-500/40 p-1"
              onClick={handleNextPage}
            >
              <div className="h-full flex flex-col items-center justify-between p-4 border-2 border-dashed border-amber-400/30 rounded-xl">
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-widest border border-amber-400/40">
                    Edition 2026 • Hard Cover
                  </span>
                  <h1 className="font-serif text-3xl font-extrabold text-amber-200 mt-4 leading-tight">
                    A Grand Birthday Story
                  </h1>
                  <p className="text-xs font-serif text-amber-300/80 italic mt-1">
                    Dedicated to {recipientName}
                  </p>
                </div>

                <div className="my-2">
                  <SpriteMascot action="wave" size={120} showSpeech={true} speechText="Open the book!" />
                </div>

                <div className="w-full">
                  <div className="p-3 bg-amber-950/60 rounded-xl border border-amber-600/30">
                    <p className="font-handwriting text-2xl text-amber-300">
                      Happy Birthday, {recipientName}!
                    </p>
                    <p className="text-[10px] text-amber-400/70 font-semibold mt-1">
                      Flip page to read your story →
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back: Page 1 (Chapter I - Message) */}
            <div 
              className="book-page-face-3d book-page-back-3d cursor-pointer p-6 flex flex-col justify-between"
              onClick={handlePrevPage}
            >
              <div className="h-full flex flex-col justify-between text-slate-800">
                <div>
                  <div className="flex items-center justify-between border-b pb-2 border-amber-200">
                    <span className="font-serif text-xs font-black text-amber-800 uppercase tracking-widest">
                      Chapter I
                    </span>
                    <span className="text-[10px] text-amber-600 font-bold">Page 1</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-amber-950 mt-4">
                    Wishes From The Heart
                  </h2>
                  <p className="font-serif text-xs text-slate-700 leading-relaxed mt-4 italic bg-amber-50 p-4 rounded-xl border border-amber-200">
                    "{message}"
                  </p>
                </div>

                <div className="text-right border-t pt-3 border-amber-200">
                  <p className="font-handwriting text-2xl text-rose-700">
                    {senderName}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold">With endless love & cheer</p>
                </div>
              </div>
            </div>
          </div>

          {/* SHEET 1 */}
          <div 
            className="book-sheet-3d"
            style={{ 
              transform: flippedSheets[1] ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              zIndex: flippedSheets[1] ? 2 : 2
            }}
          >
            {/* Front: Page 2 (Chapter II - Cake) */}
            <div 
              className="book-page-face-3d book-page-front-3d cursor-pointer p-6 flex flex-col justify-between text-center"
              onClick={flippedSheets[0] ? handleNextPage : undefined}
            >
              <div className="h-full flex flex-col justify-between text-slate-800">
                <div>
                  <div className="flex items-center justify-between border-b pb-2 border-amber-200">
                    <span className="font-serif text-xs font-black text-amber-800 uppercase tracking-widest">
                      Chapter II
                    </span>
                    <span className="text-[10px] text-amber-600 font-bold">Page 2</span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-amber-950 mt-3">
                    The Celebration Cake
                  </h2>
                </div>

                {/* Cake Display */}
                <div className="my-2 cursor-pointer group" onClick={(e) => { e.stopPropagation(); handleBlowOut(); }}>
                  <div className="w-40 h-28 mx-auto relative flex flex-col items-center justify-end">
                    <div className="w-36 h-8 bg-amber-900 rounded-b-lg border-t-2 border-amber-700" />
                    <div className="w-30 h-8 bg-amber-800 border-t-2 border-amber-600" />
                    <div className="w-24 h-8 bg-pink-500 rounded-t-lg border-t-2 border-pink-300 flex justify-around">
                      <div className="w-2 h-4 bg-white rounded-b-full" />
                      <div className="w-2 h-5 bg-white rounded-b-full" />
                    </div>

                    <div className="absolute -top-5 w-2.5 h-8 bg-rose-500 rounded-t-sm">
                      {!candlesBlown && (
                        <div className="absolute -top-3 -left-1 w-4 h-4 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_#fbbf24]" />
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleBlowOut(); }}
                    className={`mt-4 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 mx-auto ${
                      candlesBlown ? 'bg-emerald-600 text-white' : 'bg-rose-500 text-white hover:bg-rose-600'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>{candlesBlown ? 'Candles Blown! Wish Sent!' : 'Click To Blow Out Candle'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  Make a birthday wish as you blow out the flame!
                </p>
              </div>
            </div>

            {/* Back: Page 3 (Chapter III - Polaroid photo) */}
            <div 
              className="book-page-face-3d book-page-back-3d cursor-pointer p-6 flex flex-col justify-between text-center"
              onClick={handlePrevPage}
            >
              <div className="h-full flex flex-col justify-between text-slate-800">
                <div>
                  <div className="flex items-center justify-between border-b pb-2 border-amber-200">
                    <span className="font-serif text-xs font-black text-amber-800 uppercase tracking-widest">
                      Chapter III
                    </span>
                    <span className="text-[10px] text-amber-600 font-bold">Page 3</span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-amber-950 mt-3">
                    Captured Memory
                  </h2>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-1.5 max-w-[270px] mx-auto">
                  {displayPhotos.map((photo, index) => {
                    const count = displayPhotos.length;
                    let photoWidth = 'w-[160px]';
                    let textClass = 'text-[9px] mt-1';
                    
                    if (count > 2) {
                      photoWidth = 'w-[75px]';
                      textClass = 'text-[6px] mt-0.5';
                    } else if (count === 2) {
                      photoWidth = 'w-[95px] font-bold';
                      textClass = 'text-[8px] mt-0.5';
                    }
                    
                    const rotations = ['rotate-[-2deg]', 'rotate-[1.5deg]', 'rotate-[-1deg]', 'rotate-[2deg]', 'rotate-[-3deg]'];
                    const rotation = rotations[index % rotations.length];
                    
                    return (
                      <div 
                        key={index} 
                        className={`polaroid-frame bg-white p-1 pb-2 rounded-xs shadow-md border border-slate-200/50 ${photoWidth} ${rotation} transition-transform hover:scale-105 duration-200`}
                      >
                        <div className="aspect-square overflow-hidden bg-slate-100 rounded-2xs">
                          <ImageWithLoader src={photo} alt={`Polaroid ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <div className="truncate px-0.5">
                          <p className={`font-handwriting font-bold text-slate-800 truncate leading-none ${textClass}`}>
                            {displayCaptions[index] || ''}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-[11px] text-amber-900 font-semibold italic">
                  Precious moments cherished forever.
                </p>
              </div>
            </div>
          </div>

          {/* SHEET 2 */}
          <div 
            className="book-sheet-3d"
            style={{ 
              transform: flippedSheets[2] ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              zIndex: flippedSheets[2] ? 3 : 1
            }}
          >
            {/* Front: Page 4 (Chapter IV - Mascot Dance) */}
            <div 
              className="book-page-face-3d book-page-front-3d cursor-pointer p-6 flex flex-col justify-between text-center"
              onClick={flippedSheets[1] ? handleNextPage : undefined}
            >
              <div className="h-full flex flex-col justify-between text-slate-800">
                <div>
                  <div className="flex items-center justify-between border-b pb-2 border-amber-200">
                    <span className="font-serif text-xs font-black text-amber-800 uppercase tracking-widest">
                      Chapter IV
                    </span>
                    <span className="text-[10px] text-amber-600 font-bold">Page 4</span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-amber-950 mt-3">
                    Joyful Birthday Dance
                  </h2>
                </div>

                <div className="flex justify-center my-2">
                  <SpriteMascot action="dance" size={130} showSpeech={true} speechText="Keep dancing & celebrating!" />
                </div>

                <p className="text-xs text-slate-600 font-serif leading-relaxed px-2">
                  May your year ahead be as vibrant, energetic, and full of smiles as this festive dance!
                </p>
              </div>
            </div>

            {/* Back: Page 5 (Hard Back Cover) */}
            <div 
              className="book-page-face-3d book-page-back-3d cursor-pointer bg-gradient-to-br from-amber-950 via-rose-950 to-slate-950 text-amber-100 text-center border-4 border-amber-500/40 p-1"
              onClick={handlePrevPage}
            >
              <div className="h-full flex flex-col items-center justify-between p-4 border-2 border-dashed border-amber-400/30 rounded-xl">
                <div>
                  <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <h2 className="font-serif text-2xl font-bold text-amber-200">
                    Happy Birthday!
                  </h2>
                  <p className="text-xs text-amber-300/80 mt-1">
                    End of Storybook • {recipientName}'s Edition
                  </p>
                </div>

                <div className="p-3 bg-amber-900/60 rounded-xl border border-amber-600/40 w-full">
                  <p className="text-xs font-bold text-amber-200">
                    Created with WishThemHappy
                  </p>
                  <p className="text-[10px] text-amber-400/70 mt-1">
                    Keep this memory book forever!
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1 text-xs text-amber-300 font-handwriting">
                  <span>With Love</span>
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Instruction */}
      <p className="text-xs text-slate-500 font-semibold mt-4 text-center">
        Tip: Click the pages directly or use the arrow controls above to flip!
      </p>
    </div>
  );
}
