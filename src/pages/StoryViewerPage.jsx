import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GrandSurpriseStory } from '../stories/GrandSurpriseStory';
import { FlipbookStory } from '../stories/FlipbookStory';
import { getWishBySlug } from '../utils/wishStorage';
import { soundManager } from '../utils/audioSynth';
import confetti from 'canvas-confetti';
import { Flame, Share2, Check, ArrowLeft, Heart } from 'lucide-react';

/* ─────────────────────────────────────────
   Floating petal / particle for fullscreen
───────────────────────────────────────── */
function Petal({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none opacity-30"
      style={{
        width: '10px', height: '10px',
        background: 'linear-gradient(135deg, #FFD1DC, #FF6B8B)',
        animation: `floatUp ${3 + Math.random() * 4}s ease-in infinite`,
        ...style,
      }}
    />
  );
}

/* ─────────────────────────────────────────
   Full-screen scene wrapper
───────────────────────────────────────── */
function FullscreenScene({ children, bg = 'from-[#FFF5F7] via-[#FFF0F4] to-[#FFE8EE]' }) {
  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br ${bg} relative overflow-hidden`}>
      {/* decorative circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-rose-200/25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-100/20 blur-3xl pointer-events-none" />
      <div className="relative z-10 w-full max-w-lg px-6 py-10">
        {children}
      </div>
    </div>
  );
}
class ViewErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-rose-100 max-w-md w-full">
            <h2 className="text-red-600 font-bold text-lg mb-2">Something went wrong</h2>
            <p className="text-slate-600 text-sm mb-4">We encountered a rendering error loading this card.</p>
            <pre className="text-xs bg-red-50 text-red-700 p-4 rounded-xl overflow-auto text-left mb-6 font-mono max-h-60">
              {this.state.error?.stack || this.state.error?.message || String(this.state.error)}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function StoryViewerPage(props) {
  return (
    <ViewErrorBoundary>
      <StoryViewerPageContent {...props} />
    </ViewErrorBoundary>
  );
}

function StoryViewerPageContent({ slug, onNavigate }) {
  const [wish, setWish]                   = useState(null);
  const [isLoading, setIsLoading]         = useState(true);
  const [cardOpened, setCardOpened]       = useState(false);
  const [currentScene, setCurrentScene]   = useState(1);
  const [candlesBlown, setCandlesBlown]   = useState(false);
  const [copiedLink, setCopiedLink]       = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showFinalShare, setShowFinalShare] = useState(false);
  const petalsRef = useRef([...Array(12)].map((_, i) => ({
    key: i,
    left: `${Math.random() * 90}%`,
    top: `${Math.random() * 80}%`,
    delay: `${Math.random() * 5}s`,
  })));

  // Detect fullscreen / shared mode
  const isFullscreenMode = slug.includes('shared') || slug.includes('data=');

  // Load wish data — either from URL-encoded payload or local storage
  useEffect(() => {
    setIsLoading(true);
    let data = null;
    const dataMatch = slug.match(/data=([^&]+)/);
    if (dataMatch && dataMatch[1]) {
      try {
        const decoded = decodeURIComponent(dataMatch[1]).replace(/ /g, '+');
        let json;
        try {
          // Try standard unicode decoding first
          json = decodeURIComponent(escape(atob(decoded)));
        } catch {
          // Fallback to legacy atob decoding
          json = atob(decoded);
        }

        let parsed;
        if (json.startsWith('%')) {
          parsed = JSON.parse(decodeURIComponent(json));
        } else {
          parsed = JSON.parse(json);
        }

        const decodeSafe = (val) => {
          if (typeof val === 'string' && val.includes('%')) {
            try {
              return decodeURIComponent(val);
            } catch {
              return val;
            }
          }
          return val;
        };

        let rawPhotos = parsed.p || parsed.polaroidPhotos || parsed.polaroidPhoto || [];
        let rawCaptions = parsed.pc || parsed.polaroidCaptions || parsed.polaroidCaption || [];
        
        let photosArray = Array.isArray(rawPhotos) ? rawPhotos : (rawPhotos ? [rawPhotos] : []);
        let captionsArray = Array.isArray(rawCaptions) ? rawCaptions : (rawCaptions ? [rawCaptions] : []);

        const decodedPhotos = photosArray.map(p => decodeSafe(p) || '');
        const decodedCaptions = captionsArray.map(c => decodeSafe(c) || '');

        data = {
          id: 'shared',
          recipientName: decodeSafe(parsed.n || parsed.recipientName) || 'Friend',
          age: decodeSafe(parsed.a || parsed.age) || '',
          senderName: decodeSafe(parsed.s || parsed.senderName) || 'A Well-Wisher',
          message: decodeSafe(parsed.m || parsed.message) || 'Wishing you the happiest birthday ever!',
          theme: decodeSafe(parsed.t || parsed.theme) || 'pastel',
          mascotAction: decodeSafe(parsed.ma || parsed.mascotAction) || 'wave',
          stickers: parsed.st || parsed.stickers || [],
          polaroidPhotos: decodedPhotos,
          polaroidCaptions: decodedCaptions,
          createdAt: new Date().toISOString(),
        };
      } catch (e) {
        console.error('Failed to parse shared wish data', e);
      }
    }
    if (!data) {
      const cleanSlug = slug.split('?')[0];
      data = getWishBySlug(cleanSlug);
    }
    setWish(data);
    setIsLoading(false);
  }, [slug]);

  // Keyboard: Enter / arrows to advance
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === 'ArrowRight') {
        if (!cardOpened) openCard();
        else if (currentScene < 3) nextScene();
      } else if (e.key === 'ArrowLeft' && cardOpened && currentScene > 1) {
        setCurrentScene(p => p - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cardOpened, currentScene]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rose-50/50 flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-[#FF6B8B] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-black text-[#FF6B8B] animate-pulse">Unwrapping your card...</p>
      </div>
    );
  }

  if (!wish) {
    return (
      <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-rose-100 max-w-md w-full space-y-4 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-3xl animate-bounce">
            💝
          </div>
          <h2 className="text-[#FF6B8B] font-black text-xl">Card Not Found</h2>
          <p className="text-slate-600 text-xs leading-relaxed font-semibold">
            We couldn't load this birthday card. The shared link might be incomplete, corrupted, or expired.
          </p>
          <div className="pt-4 flex flex-col gap-2">
            <button
              onClick={() => onNavigate('create')}
              className="px-6 py-3 bg-[#FF6B8B] hover:bg-[#e05372] text-white rounded-2xl text-xs font-black shadow-md transition-colors"
            >
              Create a New Card
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-extrabold transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── helpers ──────────────────────────────────────────────────────────────
  const openCard = () => {
    setCardOpened(true);
    setCurrentScene(1);
    soundManager.playConfettiPop();
    fireConfetti();
  };

  const nextScene = () => {
    if (currentScene < 3) {
      setCurrentScene(p => p + 1);
      soundManager.playConfettiPop();
      if (currentScene === 2 && !isPlayingMusic) {
        setIsPlayingMusic(true);
        soundManager.playHappyBirthday(() => setIsPlayingMusic(false));
      }
    }
    if (currentScene === 3) setShowFinalShare(true);
  };

  const blowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    soundManager.playCandleBlowout();
    fireConfetti();
    setTimeout(nextScene, 1200);
  };

  const fireConfetti = () => {
    confetti({ particleCount: 140, spread: 100, origin: { y: 0.55 },
      colors: ['#FF6B8B', '#FFD1DC', '#FFAEC1', '#fff', '#ffd700'] });
  };

  const getShareUrl = () => {
    try {
      if (wish.id && wish.id !== 'shared') {
        return `${window.location.origin}${window.location.pathname}#story/${wish.id}`;
      }
      const payload = { n: wish.recipientName, a: wish.age, s: wish.senderName,
        m: wish.message, t: wish.theme, ma: wish.mascotAction, st: wish.stickers || [] };
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      return `${window.location.origin}${window.location.pathname}#story/shared?data=${encoded}`;
    } catch { return window.location.href; }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // ── Theme colours ─────────────────────────────────────────────────────────
  const themeCard = {
    neon:     'bg-slate-900 text-white border-cyan-400/50 shadow-cyan-500/20',
    royal:    'bg-gradient-to-br from-amber-50 via-rose-50 to-amber-100 text-slate-900 border-amber-300',
    vintage:  'bg-[#fbf4ea] text-amber-950 border-amber-300',
    default:  'bg-white/95 text-[#4A2E35] border-pink-200',
  };
  const cardCls = themeCard[wish.theme] ?? themeCard.default;

  // ── Fullscreen recipient view ─────────────────────────────────────────────
  if (isFullscreenMode) {
    // SCENE 0 – unopened card
    if (!cardOpened) {
      return (
        <FullscreenScene>
          {petalsRef.current.map(p => (
            <Petal key={p.key} style={{ left: p.left, top: p.top, animationDelay: p.delay }} />
          ))}

          <div
            onClick={openCard}
            className="text-center cursor-pointer select-none group"
          >
            {/* Logo */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white shadow-xl border-2 border-pink-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img src="/assets/logo.png" alt="WishThemHappy" className="w-14 h-14 object-contain" />
            </div>

            {/* Tag */}
            <p className="text-[11px] font-black uppercase tracking-widest text-pink-400 mb-3">
              A birthday card for
            </p>

            {/* Name */}
            <h1 className="text-5xl sm:text-7xl font-black text-[#4A2E35] leading-none mb-2 tracking-tight">
              {wish.recipientName}
            </h1>

            {wish.age && (
              <p className="text-base font-bold text-pink-500 mb-6">Turning {wish.age}</p>
            )}

            <p className="text-sm font-semibold text-[#7A5560] mb-10">
              From <span className="font-black text-[#4A2E35]">{wish.senderName}</span>
            </p>

            {/* Cake graphic */}
            <div className="flex justify-center mb-8">
              <img
                src="/assets/birthday_cake.png"
                alt="Birthday Cake"
                className="w-36 h-36 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* CTA pulse */}
            <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF6B8B] text-white font-black text-sm shadow-xl shadow-pink-300/50 group-hover:shadow-pink-400/60 group-hover:scale-105 transition-all duration-300">
              <Heart className="w-4 h-4 fill-white" />
              Tap to open your card
            </div>

            <p className="text-[10px] text-pink-300 mt-4 font-semibold">or press Enter ↵</p>
          </div>
        </FullscreenScene>
      );
    }

    if (wish.theme === 'flipbook') {
      return (
        <FullscreenScene bg="from-[#2b2520] via-[#1f1a16] to-[#120f0d]">
          <div className="w-full flex flex-col items-center">
            <FlipbookStory 
              recipientName={wish.recipientName} 
              senderName={wish.senderName}
              message={wish.message} 
              age={wish.age} 
              polaroidPhotos={wish.polaroidPhotos}
              polaroidCaptions={wish.polaroidCaptions}
              onComplete={blowCandles} 
            />
            {showFinalShare && (
              <div className="w-full max-w-md mt-6 px-4 animate-fade-in" style={{ animation: 'fadeSlideUp 0.6s ease both' }}>
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-amber-200/50 shadow-2xl space-y-3 text-left">
                  <p className="text-xs font-black text-amber-900 uppercase tracking-wider">Send your own birthday card</p>
                  <p className="text-xs text-slate-600 font-medium">WishThemHappy — Create beautiful, animated birthday cards for free.</p>
                  <a
                    href={window.location.origin + window.location.pathname}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-800 text-white font-black text-xs shadow-md hover:scale-105 transition-transform"
                  >
                    Create a card
                  </a>
                </div>
              </div>
            )}
          </div>
        </FullscreenScene>
      );
    }

    if (wish.theme === 'grand_surprise') {
      return (
        <FullscreenScene bg="from-[#FFF5F7] via-[#FFF0F4] to-[#FFE8EE]">
          <div className="w-full flex flex-col items-center">
            <GrandSurpriseStory 
              recipientName={wish.recipientName} 
              senderName={wish.senderName}
              message={wish.message} 
              mascotAction={wish.mascotAction || 'celebrate'} 
              onComplete={blowCandles} 
            />
            {showFinalShare && (
              <div className="w-full max-w-md mt-6 px-4 animate-fade-in" style={{ animation: 'fadeSlideUp 0.6s ease both' }}>
                <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 border border-pink-100 shadow-xl space-y-3 text-left">
                  <p className="text-xs font-black text-[#4A2E35] uppercase tracking-wider">Send your own birthday card</p>
                  <p className="text-xs text-[#7A5560] font-medium">WishThemHappy — Create beautiful, animated birthday cards for free.</p>
                  <a
                    href={window.location.origin + window.location.pathname}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6B8B] text-white font-black text-xs shadow-md hover:scale-105 transition-transform"
                  >
                    Create a card
                  </a>
                </div>
              </div>
            )}
          </div>
        </FullscreenScene>
      );
    }

    // SCENE 1 – birthday message
    if (currentScene === 1) {
      return (
        <FullscreenScene>
          <div className="text-center space-y-6" style={{ animation: 'fadeSlideUp 0.6s ease both' }}>
            <p className="text-[11px] font-black uppercase tracking-widest text-pink-400">
              Happy Birthday
            </p>
            <h1 className="text-5xl sm:text-6xl font-black text-[#4A2E35] leading-tight">
              {wish.recipientName}
            </h1>

            {wish.message && (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-7 shadow-xl border border-pink-100 text-left">
                <p className="text-base sm:text-lg leading-relaxed text-[#4A2E35] font-medium italic">
                  "{wish.message}"
                </p>
                <p className="mt-4 text-sm font-bold text-pink-500 text-right">
                  — {wish.senderName}
                </p>
              </div>
            )}

            <button
              onClick={nextScene}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF6B8B] text-white font-black text-sm shadow-xl shadow-pink-300/50 hover:scale-105 transition-transform"
            >
              Blow the candles
              <Flame className="w-4 h-4" />
            </button>
          </div>
        </FullscreenScene>
      );
    }

    // SCENE 2 – candle blowout
    if (currentScene === 2) {
      return (
        <FullscreenScene>
          <div className="text-center space-y-6" style={{ animation: 'fadeSlideUp 0.5s ease both' }}>
            <p className="text-[11px] font-black uppercase tracking-widest text-pink-400">
              Make a wish
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#4A2E35]">
              Blow out the candles!
            </h2>

            {/* Interactive cake */}
            <div
              onClick={blowCandles}
              className="relative w-52 h-52 mx-auto cursor-pointer select-none group"
            >
              <img
                src="/assets/birthday_cake.png"
                alt="Birthday Cake"
                className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
              {!candlesBlown ? (
                <>
                  <img src="/assets/candle_flame.png" alt="" aria-hidden
                    className="w-7 h-7 absolute top-[8%] left-[42%] -translate-x-1/2 animate-pulse"
                    style={{ animationDuration: '0.7s' }} />
                  <img src="/assets/candle_flame.png" alt="" aria-hidden
                    className="w-7 h-7 absolute top-[5%] left-[50%] -translate-x-1/2 animate-pulse"
                    style={{ animationDuration: '0.55s' }} />
                  <img src="/assets/candle_flame.png" alt="" aria-hidden
                    className="w-7 h-7 absolute top-[8%] left-[58%] -translate-x-1/2 animate-pulse"
                    style={{ animationDuration: '0.65s' }} />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/95 text-[#4A2E35] text-xs font-black px-4 py-2 rounded-full shadow-lg border border-pink-200">
                    Wish sent!
                  </span>
                </div>
              )}
            </div>

            {!candlesBlown && (
              <button
                onClick={blowCandles}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF6B8B] text-white font-black text-sm shadow-xl shadow-pink-300/50 hover:scale-105 transition-transform"
              >
                <Flame className="w-4 h-4" />
                Click to blow out
              </button>
            )}
          </div>
        </FullscreenScene>
      );
    }

    // SCENE 3 – finale / share
    return (
      <FullscreenScene>
        {petalsRef.current.map(p => (
          <Petal key={p.key} style={{ left: p.left, top: p.top, animationDelay: p.delay }} />
        ))}
        <div className="text-center space-y-6" style={{ animation: 'fadeSlideUp 0.6s ease both' }}>
          {wish.polaroidPhotos && wish.polaroidPhotos.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto py-2">
              {wish.polaroidPhotos.map((photo, index) => {
                const rotations = ['rotate-[-3deg]', 'rotate-[2deg]', 'rotate-[-1deg]', 'rotate-[3deg]', 'rotate-[-2deg]'];
                const rotation = rotations[index % rotations.length];
                return (
                  <div 
                    key={index}
                    className={`bg-white p-2 pb-4 rounded-xs shadow-lg border border-slate-200/50 ${rotation} w-[100px] sm:w-[115px] transition-transform hover:rotate-0 hover:scale-105 duration-300`}
                  >
                    <img src={photo} className="w-full aspect-square object-cover" alt="Memory" />
                    {wish.polaroidCaptions?.[index] && (
                      <p className="font-handwriting text-slate-800 text-[9px] mt-1 text-center truncate">
                        {wish.polaroidCaptions[index]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : wish.polaroidPhoto ? (
            <div className="bg-white p-3 pb-6 rounded-xs shadow-xl border border-slate-200/50 rotate-[-1.5deg] max-w-[180px] mx-auto transition-transform hover:rotate-0 duration-300">
              <img src={wish.polaroidPhoto} className="w-full aspect-square object-cover" alt="Memory" />
              {wish.polaroidCaption && (
                <p className="font-handwriting text-slate-800 text-xs mt-3 text-center">
                  {wish.polaroidCaption}
                </p>
              )}
            </div>
          ) : (
            <div className="w-24 h-24 mx-auto rounded-full bg-white shadow-xl border-2 border-pink-100 flex items-center justify-center">
              <img src="/assets/balloon.png" alt="Balloon" className="w-16 h-16 object-contain" />
            </div>
          )}

          <h2 className="text-4xl sm:text-5xl font-black text-[#4A2E35] leading-tight">
            Happy Birthday,<br />{wish.recipientName}!
          </h2>
          <p className="text-base font-semibold text-[#7A5560]">
            May this year be the most wonderful yet.
          </p>
          <p className="text-sm font-bold text-pink-500">
            With love — {wish.senderName}
          </p>

          {/* Share back */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 border border-pink-100 shadow-xl space-y-3 text-left">
            <p className="text-xs font-black text-[#4A2E35] uppercase tracking-wider">Send your own birthday card</p>
            <p className="text-xs text-[#7A5560] font-medium">WishThemHappy — Create beautiful birthday cards for free.</p>
            <a
              href={window.location.origin + window.location.pathname}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6B8B] text-white font-black text-xs shadow-md hover:scale-105 transition-transform"
            >
              Create a card
            </a>
          </div>
        </div>
      </FullscreenScene>
    );
  }

  // ── Admin / owner view (normal mode with navbar) ──────────────────────────
  if (wish.theme === 'flipbook') {
    return (
      <div className="min-h-screen bg-brandBg flex flex-col">
        <Navbar onNavigate={onNavigate} currentRoute="story-viewer" />
        <main className="max-w-4xl mx-auto px-4 py-10 flex-1 w-full">
          <button onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 font-bold text-xs shadow-sm border border-slate-200 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Wishes
          </button>
          <FlipbookStory recipientName={wish.recipientName} senderName={wish.senderName}
            message={wish.message} age={wish.age} polaroidPhotos={wish.polaroidPhotos}
            polaroidCaptions={wish.polaroidCaptions} onComplete={blowCandles} />
        </main>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  if (wish.theme === 'grand_surprise') {
    return (
      <div className="min-h-screen bg-brandBg flex flex-col">
        <Navbar onNavigate={onNavigate} currentRoute="story-viewer" />
        <main className="max-w-4xl mx-auto px-4 py-10 flex-1 w-full">
          <button onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 font-bold text-xs shadow-sm border border-slate-200 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Wishes
          </button>
          <GrandSurpriseStory recipientName={wish.recipientName} senderName={wish.senderName}
            message={wish.message} mascotAction={wish.mascotAction || 'celebrate'} onComplete={blowCandles} />
        </main>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandBg flex flex-col font-sans text-slate-800">
      <Navbar onNavigate={onNavigate} currentRoute="story-viewer" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full flex flex-col items-center">

        {/* Back button */}
        <div className="w-full flex items-center mb-6">
          <button onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 font-bold text-xs shadow-sm border border-slate-200">
            <ArrowLeft className="w-4 h-4" /> Back to Wishes
          </button>
        </div>

        {/* Card preview */}
        {!cardOpened ? (
          <div onClick={openCard}
            className="w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-slate-200 text-center cursor-pointer hover:scale-[1.02] transition-transform group my-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 p-1 shadow-lg">
              <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain bg-white rounded-full p-2" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mt-4">
              Birthday Card for {wish.recipientName}
            </h2>
            <p className="text-slate-500 text-xs mt-2 font-semibold">
              From {wish.senderName} · Click to preview
            </p>
            <button className="mt-6 px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-xl transition-all">
              Preview Card
            </button>
          </div>
        ) : (
          <div className="w-full space-y-6">
            {/* Card */}
            <div className={`rounded-3xl p-6 sm:p-10 shadow-2xl border-2 transition-all relative overflow-hidden ${cardCls}`}>

              {/* Header */}
              <div className="border-b pb-6 border-current/10 mb-6">
                {wish.age && (
                  <span className="px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-600 font-black text-xs uppercase tracking-wider">
                    Turning {wish.age}
                  </span>
                )}
                <h1 className="text-3xl sm:text-5xl font-black mt-2 tracking-tight">
                  Happy Birthday, {wish.recipientName}!
                </h1>
                {wish.senderName && (
                  <p className="text-sm font-semibold opacity-75 mt-1">
                    With love from <strong>{wish.senderName}</strong>
                  </p>
                )}
              </div>

              {/* Scene 1 – message */}
              {currentScene === 1 && wish.message && (
                <div className="my-6 p-6 rounded-2xl bg-current/5 border border-current/10">
                  <h3 className="text-xs uppercase font-black tracking-widest opacity-60 mb-3">Birthday Message</h3>
                  <p className="text-lg font-medium leading-relaxed italic">"{wish.message}"</p>
                </div>
              )}

              {/* Scene 2 – cake */}
              {currentScene === 2 && (
                <div className="my-8 flex flex-col items-center text-center gap-4">
                  <h3 className="text-xs uppercase font-black tracking-widest opacity-70">Blow the candles</h3>
                  <div className="relative cursor-pointer" onClick={blowCandles}>
                    <img src="/assets/birthday_cake.png" alt="Cake" className="w-48 h-48 object-contain drop-shadow-xl hover:scale-105 transition-transform" />
                    {!candlesBlown ? (
                      <>
                        <img src="/assets/candle_flame.png" alt="" className="w-6 h-6 absolute top-[10%] left-[44%] -translate-x-1/2 animate-pulse" style={{ animationDuration: '0.8s' }} />
                        <img src="/assets/candle_flame.png" alt="" className="w-6 h-6 absolute top-[7%] left-[50%] -translate-x-1/2 animate-pulse" style={{ animationDuration: '0.6s' }} />
                        <img src="/assets/candle_flame.png" alt="" className="w-6 h-6 absolute top-[10%] left-[56%] -translate-x-1/2 animate-pulse" style={{ animationDuration: '0.7s' }} />
                      </>
                    ) : (
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-black text-amber-500 bg-white/95 px-3 py-1 rounded-full shadow border border-amber-200">
                        Wish sent!
                      </div>
                    )}
                  </div>
                  <button onClick={blowCandles} disabled={candlesBlown}
                    className={`px-7 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition-all ${candlesBlown ? 'bg-slate-700 text-white cursor-default' : 'bg-slate-900 text-white hover:scale-105'}`}>
                    <Flame className="w-4 h-4" />
                    {candlesBlown ? 'Wish Granted!' : 'Click to Blow'}
                  </button>
                </div>
              )}

              {/* Scene 3 – finale */}
              {currentScene === 3 && (
                <div className="my-8 text-center space-y-4">
                  <img src="/assets/balloon.png" alt="Balloon" className="w-20 h-20 object-contain mx-auto" />
                  <p className="text-2xl font-black">Celebrate, {wish.recipientName}!</p>
                  <p className="text-sm opacity-70">May this year bring you endless joy.</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-current/10">
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map(s => (
                    <button key={s} onClick={() => setCurrentScene(s)}
                      className={`w-8 h-8 rounded-full font-black text-xs transition-all ${currentScene === s ? 'bg-slate-900 text-white scale-110' : 'bg-current/10 opacity-60 hover:opacity-100'}`}>
                      {s}
                    </button>
                  ))}
                </div>
                {currentScene < 3 ? (
                  <button onClick={nextScene}
                    className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md">
                    Next (Enter ↵)
                  </button>
                ) : (
                  <button onClick={copyLink}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#FF6B8B] hover:bg-[#e05372] text-white font-extrabold text-xs shadow-md">
                    {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    {copiedLink ? 'Link Copied!' : 'Share this Birthday Card'}
                  </button>
                )}
              </div>
            </div>

            {/* Share panel */}
            <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-xl flex flex-col items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Share this card</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-lg">
                  The recipient will see only the beautiful fullscreen card — no website chrome.
                </p>
                <button onClick={copyLink}
                  className="mt-3 flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#FF6B8B] hover:bg-[#e05372] text-white font-extrabold text-xs shadow-md transition-all">
                  {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {copiedLink ? 'Copied!' : 'Copy Share Link'}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
