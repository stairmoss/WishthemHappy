import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/audioSynth';
import { SpriteMascot } from '../components/mascot/SpriteMascot';
import { RoughNotationText } from '../components/common/RoughNotationText';
import { FireworksCanvas } from '../components/common/FireworksCanvas';
import { Heart, Sparkles, Flame, PartyPopper, Music, Volume2, VolumeX, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export function GrandSurpriseStory({
  recipientName = 'Sapthesh',
  senderName = 'With love & best wishes',
  message = 'May your special day be filled with immense joy, laughter, and all the wonderful things life has to offer. Here is to another year of amazing adventures!',
  mascotAction = 'celebrate',
  onComplete
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [typedGreeting, setTypedGreeting] = useState('');
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [balloons, setBalloons] = useState([]);
  const [fireworks, setFireworks] = useState([]);

  const fullGreeting = 'Happy Birthday,';

  // Toggle Background Music
  const handleStartCelebration = () => {
    setCurrentStep(2);
    soundManager.startBirthdayMelody();
    setIsPlayingAudio(true);
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      soundManager.stopMelody();
      setIsPlayingAudio(false);
    } else {
      soundManager.startBirthdayMelody();
      setIsPlayingAudio(true);
    }
  };

  // Step 2: Open Envelope
  const handleEnvelopeClick = () => {
    setEnvelopeOpen(true);
    soundManager.playMascotCheer();
    setTimeout(() => {
      setCurrentStep(3);
    }, 700);
  };

  // Step 3: Unfold Letter
  const handleUnfoldLetter = () => {
    setCurrentStep(4);
    startCelebrationEffects();
  };

  // Step 4: Celebration Effects & Typewriter
  const startCelebrationEffects = () => {
    // Confetti Cannon Bursts
    soundManager.playConfettiPop();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => {
      confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
    }, 500);
    setTimeout(() => {
      confetti({ particleCount: 60, spread: 120, origin: { y: 0.4 } });
    }, 1000);

    // Generate Floating Balloons
    const balloonColors = ['#e94560', '#f0e68c', '#00d8d6', '#8e44ad', '#3498db', '#ff9ff3'];
    const newBalloons = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 80 + 10,
      color: balloonColors[i % balloonColors.length],
      duration: Math.random() * 6 + 10,
      delay: Math.random() * 5
    }));
    setBalloons(newBalloons);

    // Generate Fireworks
    const newFireworks = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: Math.random() * 80 + 10,
      bottom: Math.random() * 30 + 10,
      color: balloonColors[i % balloonColors.length],
      delay: Math.random() * 3
    }));
    setFireworks(newFireworks);

    // Typewriter effect
    let i = 0;
    setTypedGreeting('');
    const interval = setInterval(() => {
      if (i < fullGreeting.length) {
        setTypedGreeting(prev => prev + fullGreeting.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  // Blow out candle interaction
  const handleBlowOutCandle = () => {
    if (!isCandleLit) return;
    setIsCandleLit(false);
    soundManager.playCandleBlow();
    soundManager.playConfettiPop();
    confetti({ particleCount: 120, spread: 90 });
    if (onComplete) onComplete();
  };

  return (
    <div className="relative min-h-[750px] w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 overflow-hidden shadow-2xl border border-indigo-900/50 select-none">
      
      {/* Audio Controller */}
      <button
        onClick={toggleAudio}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold transition-all shadow-lg"
      >
        {isPlayingAudio ? <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
        <span>{isPlayingAudio ? 'Music Playing' : 'Play Music'}</span>
      </button>

      <AnimatePresence mode="wait">
        {/* --- STEP 1: WELCOME SCREEN --- */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center max-w-md bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl space-y-6"
          >
            <div className="flex justify-center">
              <SpriteMascot action="wave" size={140} showSpeech={true} speechText="A special surprise awaits you!" />
            </div>

            <h1 className="font-serif text-4xl font-extrabold text-amber-300 drop-shadow-md">
              You've got a surprise!
            </h1>
            <p className="text-slate-200 text-base leading-relaxed">
              Click below to unlock a grand personalized birthday celebration journey...
            </p>

            <button
              onClick={handleStartCelebration}
              className="w-full py-4 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Start the Celebration!
            </button>
          </motion.div>
        )}

        {/* --- STEP 2: ENVELOPE REVEAL --- */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="text-center space-y-8"
          >
            <div
              className={`envelope-container ${envelopeOpen ? 'open' : ''}`}
              onClick={handleEnvelopeClick}
            >
              <div className="envelope">
                <div className="envelope-back" />
                <div className="envelope-flap" />
                <div className="envelope-front" />
                <div className="envelope-seal">
                  <Heart className="w-6 h-6 fill-white" />
                </div>
              </div>
            </div>

            <p className="text-amber-300 font-bold text-lg animate-bounce flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> Click the sealed envelope to open!
            </p>
          </motion.div>
        )}

        {/* --- STEP 3: UNFOLDING LETTER --- */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-md w-full bg-[#fffaf0] text-slate-900 p-8 rounded-2xl shadow-2xl border-4 border-amber-200 text-center space-y-6"
          >
            <p className="font-bold text-lg text-slate-800 text-left">
              Dearest <span className="text-pink-600 font-extrabold">{recipientName}</span>,
            </p>
            <p className="text-base text-slate-700 leading-relaxed text-left italic">
              "This message carries birthday wishes straight from the heart, ready to unfold into a memorable celebration crafted just for you."
            </p>
            <p className="text-sm font-semibold text-slate-600 text-left">
              Click below to unveil your grand birthday surprise stage!
            </p>

            <button
              onClick={handleUnfoldLetter}
              className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <PartyPopper className="w-5 h-5" /> Unfold My Surprise!
            </button>
          </motion.div>
        )}

        {/* --- STEP 4: GRAND CELEBRATION STAGE --- */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl text-center space-y-6 z-20 bg-white/10 backdrop-blur-2xl p-8 rounded-3xl border border-white/20 shadow-2xl"
          >
            {/* Balloons Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {balloons.map(b => (
                <div
                  key={b.id}
                  className="absolute w-12 h-16 rounded-full opacity-80 animate-balloon-rise"
                  style={{
                    left: `${b.left}%`,
                    backgroundColor: b.color,
                    animationDuration: `${b.duration}s`,
                    animationDelay: `${b.delay}s`,
                    bottom: '-80px'
                  }}
                />
              ))}
            </div>

            {/* Fireworks Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {fireworks.map(f => (
                <div
                  key={f.id}
                  className="absolute w-2 h-2 rounded-full animate-firework-launch"
                  style={{
                    left: `${f.left}%`,
                    bottom: `${f.bottom}%`,
                    backgroundColor: f.color,
                    boxShadow: `0 0 12px ${f.color}`,
                    animationDelay: `${f.delay}s`
                  }}
                />
              ))}
            </div>

            {/* Real-time Physical Fireworks Canvas on Blowout */}
            <FireworksCanvas active={!isCandleLit} duration={10000} />

            {/* Mascot Cheer */}
            <div className="flex justify-center -mb-4">
              <SpriteMascot action={mascotAction} size={150} showSpeech={true} speechText="HAPPY BIRTHDAY!" />
            </div>

            {/* Typewriter Greeting with Rough Notation Highlight */}
            <div>
              <p className="text-amber-300 font-bold text-sm tracking-widest uppercase">To the amazing</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white min-h-[48px] flex items-center justify-center">
                <span>{typedGreeting}</span>
                <span className="w-1 h-8 bg-amber-400 ml-1 inline-block animate-pulse" />
              </h1>
              <h2 className="font-handwriting text-5xl sm:text-6xl text-amber-300 font-extrabold my-3 drop-shadow-lg">
                <RoughNotationText type="circle" color="#fbbf24" strokeWidth={3} padding={8}>
                  {recipientName}!
                </RoughNotationText>
              </h2>
            </div>

            {/* Layered Birthday Cake & Blowable Candle */}
            <div className="my-6 relative inline-block cursor-pointer group" onClick={handleBlowOutCandle}>
              <div className="w-56 h-36 mx-auto relative flex flex-col items-center justify-end">
                {/* Cake Layers */}
                <div className="w-48 h-10 bg-amber-900 rounded-b-xl border-t-4 border-amber-700 shadow-md" />
                <div className="w-40 h-10 bg-amber-800 border-t-4 border-amber-600 shadow-md" />
                <div className="w-32 h-10 bg-pink-500 rounded-t-xl border-t-4 border-pink-300 shadow-md flex justify-around">
                  <div className="w-3 h-5 bg-white rounded-b-full" />
                  <div className="w-3 h-7 bg-white rounded-b-full" />
                  <div className="w-3 h-5 bg-white rounded-b-full" />
                </div>

                {/* Candle & Flame */}
                <div className="absolute -top-6 w-3 h-10 bg-rose-500 rounded-t-sm shadow-md">
                  {isCandleLit && (
                    <div className="absolute -top-4 -left-1.5 w-6 h-6 rounded-full bg-amber-400 animate-flame-flicker shadow-[0_0_12px_#fbbf24]" />
                  )}
                </div>
              </div>

              <p className="text-xs font-bold text-amber-200 mt-3 group-hover:scale-105 transition-transform flex items-center justify-center gap-1">
                <Flame className={`w-4 h-4 ${isCandleLit ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
                {isCandleLit ? 'Click cake to blow out candles!' : 'Candles Blown Out!'}
              </p>
            </div>

            {/* Personal Wish Message */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-lg mx-auto italic bg-white/5 p-4 rounded-2xl border border-white/10">
              "{message}"
            </p>

            {/* Signature */}
            <div className="flex items-center justif-center gap-2 font-handwriting text-2xl text-amber-300">
              <span>{senderName}</span>y
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
