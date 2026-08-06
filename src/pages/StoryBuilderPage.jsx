import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SpriteMascot } from '../components/mascot/SpriteMascot';
import { soundManager } from '../utils/audioSynth';
import confetti from 'canvas-confetti';
import { Gift, ArrowRight, Share2, Check, UploadCloud } from 'lucide-react';


export function StoryBuilderPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    recipientName: '',
    age: '25',
    senderName: '',
    message: '',
    theme: 'pastel',
    mascotAction: 'celebrate',
    stickers: ['cake', 'balloon', 'gift', 'star'],
    polaroidPhotos: [],
    polaroidCaptions: [],
  });

  const [previewSpeech, setPreviewSpeech] = useState("I'm so excited for your card!");
  const [shareUrl, setShareUrl] = useState(null); // set when card is generated
  const [copiedLink, setCopiedLink] = useState(false);

  const handleFillSampleData = (themeChoice = 'flipbook') => {
    setFormData({
      recipientName: 'Sapthesh',
      age: '24',
      senderName: 'Your Coding Buddy',
      message: 'Happy Birthday! May your day be filled with endless joy, epic achievements, laughter, and magical surprises! Here is to an amazing year ahead!',
      theme: themeChoice,
      mascotAction: 'celebrate',
      stickers: ['cake', 'balloon', 'gift', 'star'],
      polaroidPhotos: [
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=300&q=80'
      ],
      polaroidCaptions: ['Sweet Memories!', 'Birthday Cheers!']
    });
    setPreviewSpeech("Sample card populated! Ready to generate!");
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSticker = (stickerName) => {
    setFormData(prev => {
      const exists = prev.stickers.includes(stickerName);
      return {
        ...prev,
        stickers: exists 
          ? prev.stickers.filter(s => s !== stickerName)
          : [...prev.stickers, stickerName]
      };
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const currentCount = (formData.polaroidPhotos || []).length;
    if (currentCount >= 5) {
      alert("You can upload a maximum of 5 photos.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image is too large. Please select an image under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 80;
        const MAX_HEIGHT = 80;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.45);
        setFormData(prev => {
          const currentPhotos = prev.polaroidPhotos || [];
          const currentCaptions = prev.polaroidCaptions || [];
          return {
            ...prev,
            polaroidPhotos: [...currentPhotos, dataUrl],
            polaroidCaptions: [...currentCaptions, '']
          };
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleCreateCard = (e) => {
    e.preventDefault();
    if (!formData.recipientName.trim()) {
      alert("Please enter the recipient's name!");
      return;
    }

    soundManager.playConfettiPop();
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 },
      colors: ['#FF6B8B', '#FFD1DC', '#FFAEC1', '#fff'] });

    // Build base64-encoded share URL — no server, no localStorage
    try {
      const payload = {
        n: formData.recipientName || 'Friend',
        a: formData.age || '',
        s: formData.senderName || 'A Well-Wisher',
        m: formData.message || 'Wishing you the happiest birthday ever!',
        t: formData.theme || 'pastel',
        ma: formData.mascotAction || 'wave',
        st: formData.stickers || [],
        p: formData.polaroidPhotos || [],
        pc: formData.polaroidCaptions || [],
      };
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      const url = `${window.location.origin}${window.location.pathname}#story/shared?data=${encodeURIComponent(encoded)}`;
      setShareUrl(url);
    } catch (err) {
      console.error('Failed to generate share URL', err);
    }
  };

  const copyShareLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-brandBg flex flex-col font-sans text-slate-800">
      <Navbar onNavigate={onNavigate} currentRoute="create" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Create an Animated Birthday Wish
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Customize the card details, choose the mascot pose, pick a theme, and preview in real-time!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Card Customization Form */}
          <div className="lg:col-span-6 bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl border border-pink-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Gift className="w-5 h-5 text-pink-500" />
                <span>Card Customization Form</span>
              </h2>
            </div>

            <form onSubmit={handleCreateCard} className="space-y-5">
              
              {/* Recipient Name & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex, Mom, Sarah"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange('recipientName', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                    Age / Turning
                  </label>
                  <input
                    type="text"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold text-sm text-center"
                  />
                </div>
              </div>

              {/* Sender Name */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Your Name / From
                </label>
                <input
                  type="text"
                  placeholder="e.g. Your Best Friend, The Squad"
                  value={formData.senderName}
                  onChange={(e) => handleInputChange('senderName', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold text-sm"
                />
              </div>

              {/* Personal Birthday Message */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Birthday Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Write your heart-felt birthday message here..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium text-sm leading-relaxed"
                />
              </div>

              {/* Theme Selector */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  Card Theme Visual Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'flipbook', label: '3D Story Flipbook', color: 'bg-gradient-to-r from-amber-600 to-amber-900' },
                    { id: 'grand_surprise', label: 'Grand Surprise', color: 'bg-gradient-to-r from-rose-500 to-amber-500' },
                    { id: 'pastel', label: 'Pastel Dreams', color: 'bg-gradient-to-r from-pink-400 to-purple-400' },
                    { id: 'neon', label: 'Cyber Glow', color: 'bg-gradient-to-r from-cyan-400 to-fuchsia-500' },
                    { id: 'royal', label: 'Royal Gold', color: 'bg-gradient-to-r from-amber-400 to-yellow-600' },
                    { id: 'vintage', label: 'Vintage Kraft', color: 'bg-gradient-to-r from-amber-700 to-amber-900' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleInputChange('theme', t.id)}
                      className={`p-3 rounded-2xl border-2 flex items-center gap-2 text-xs font-bold transition-all ${
                        formData.theme === t.id
                          ? 'border-slate-800 bg-slate-50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${t.color}`} />
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mascot Pose Selection */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  Mascot Sprite Pose
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'idle', label: 'Idle Float' },
                    { id: 'wave', label: 'Wave Hello' },
                    { id: 'dance', label: 'Party Dance' },
                    { id: 'celebrate', label: 'Celebration' }
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        handleInputChange('mascotAction', p.id);
                        setPreviewSpeech(`Mascot set to ${p.label}!`);
                      }}
                      className={`py-2 px-3 rounded-2xl text-xs font-bold border transition-all text-center ${
                        formData.mascotAction === p.id
                          ? 'border-slate-800 bg-slate-100 text-slate-900 shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stickers Selector */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  Sticker Decorators
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'cake', label: 'Cake' },
                    { id: 'balloon', label: 'Balloons' },
                    { id: 'gift', label: 'Gift Box' },
                    { id: 'star', label: 'Sparkles' }
                  ].map(st => {
                    const active = formData.stickers.includes(st.id);
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => toggleSticker(st.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          active
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {st.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Photo Upload (Memory Polaroid) */}
              <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  Upload Polaroid Photos (Max 5)
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(formData.polaroidPhotos || []).map((photo, index) => (
                    <div key={index} className="relative bg-slate-50 border border-slate-200 p-2 rounded-xl flex flex-col space-y-2">
                      <div className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden">
                        <img src={photo} className="w-full h-full object-cover" alt={`Upload ${index + 1}`} />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => {
                              const nextPhotos = prev.polaroidPhotos.filter((_, i) => i !== index);
                              const nextCaptions = prev.polaroidCaptions.filter((_, i) => i !== index);
                              return { ...prev, polaroidPhotos: nextPhotos, polaroidCaptions: nextCaptions };
                            });
                          }}
                          className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-[10px] font-black transition-opacity"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Caption"
                        value={formData.polaroidCaptions?.[index] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData(prev => {
                            const nextCaptions = [...(prev.polaroidCaptions || [])];
                            nextCaptions[index] = val;
                            return { ...prev, polaroidCaptions: nextCaptions };
                          });
                        }}
                        className="w-full px-2 py-1 rounded-lg bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-pink-500 font-bold text-[9px]"
                      />
                    </div>
                  ))}

                  {/* Add Slot box */}
                  {(formData.polaroidPhotos || []).length < 5 && (
                    <label className="relative aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
                      <UploadCloud className="w-5 h-5 text-slate-400" />
                      <span className="text-[9px] text-slate-500 font-bold mt-1 text-center px-1">
                        Add Photo ({(formData.polaroidPhotos || []).length}/5)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Submit + Share */}
              <div className="pt-4 border-t border-slate-100 space-y-3">

                {shareUrl && (
                  <div className="rounded-2xl bg-green-50 border border-green-200 p-4 space-y-3">
                    <p className="text-sm font-extrabold text-green-700">Your birthday card is ready!</p>
                    <p className="text-xs text-green-600 font-medium">Copy the link below and send it to {formData.recipientName || 'the birthday person'}. They will see only the card — nothing else.</p>
                    <div className="flex items-center gap-2">
                      <input
                        readOnly
                        value={shareUrl}
                        className="flex-1 text-[10px] px-3 py-2 rounded-xl bg-white border border-green-200 font-mono truncate"
                        onClick={e => e.target.select()}
                      />
                      <button
                        type="button"
                        onClick={copyShareLink}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF6B8B] text-white font-black text-xs whitespace-nowrap hover:bg-[#e05372] transition-colors"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                        {copiedLink ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  <span>{shareUrl ? 'Regenerate Card' : 'Generate Birthday Card'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: Live Card Preview */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="text-center mb-2">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Live Card Preview
              </span>
            </div>

            <div className={`rounded-3xl p-8 shadow-2xl border transition-all relative overflow-hidden ${
              formData.theme === 'neon'
                ? 'bg-slate-900 text-white border-cyan-500/50 shadow-cyan-500/20'
                : formData.theme === 'royal'
                ? 'bg-gradient-to-br from-amber-50 to-rose-100 text-slate-900 border-amber-300 shadow-amber-500/10'
                : formData.theme === 'pastel'
                ? 'bg-brandBg/90 text-brandText border-brandSecondary shadow-brandPrimary/20'
                : formData.theme === 'flipbook'
                ? 'bg-amber-50/90 text-amber-900 border-amber-200 shadow-amber-800/10'
                : formData.theme === 'vintage'
                ? 'bg-amber-100/90 text-amber-950 border-amber-300 shadow-amber-900/10'
                : formData.theme === 'grand_surprise'
                ? 'bg-gradient-to-br from-rose-50 to-amber-50 text-rose-950 border-rose-200 shadow-rose-500/10'
                : 'bg-white/90 text-slate-800 border-pink-200 shadow-pink-500/10'
            }`}>

              {/* Card Header */}
              <div className="flex items-center justify-between mb-6 border-b pb-4 border-current/10">
                <div>
                  <h3 className="text-2xl font-black">
                    Happy Birthday, {formData.recipientName || '[Name]'}!
                  </h3>
                  <p className="text-xs opacity-75 font-semibold mt-1">
                    Turning {formData.age || '25'} • With love from {formData.senderName || '[Your Name]'}
                  </p>
                </div>
                <img src="/assets/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
              </div>

              {/* Center Mascot Preview */}
              <div className="my-6 py-2 flex flex-col items-center justify-center">
                <SpriteMascot
                  action={formData.mascotAction}
                  size={190}
                  showSpeech={true}
                  speechText={previewSpeech}
                  interactive={true}
                />
              </div>

              {/* Personal Message Box */}
              <div className="p-4 rounded-2xl bg-current/5 border border-current/10 my-4 italic text-sm leading-relaxed">
                "{formData.message || 'Write your customized birthday wish message to preview it live here!'}"
              </div>


              {formData.polaroidPhotos && formData.polaroidPhotos.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 my-4">
                  {formData.polaroidPhotos.map((photo, index) => {
                    const rotations = ['rotate-[-2deg]', 'rotate-[1.5deg]', 'rotate-[-1deg]', 'rotate-[2deg]', 'rotate-[-3deg]'];
                    const rotation = rotations[index % rotations.length];
                    return (
                      <div 
                        key={index}
                        className={`bg-white p-1.5 pb-3 rounded-xs shadow-md border border-slate-200/50 ${rotation} max-w-[85px] text-slate-800 flex-shrink-0 transition-transform hover:scale-105 duration-200`}
                      >
                        <img src={photo} className="w-full aspect-square object-cover" alt={`Preview Polaroid ${index + 1}`} />
                        {formData.polaroidCaptions?.[index] && (
                          <p className="font-handwriting text-[7px] mt-1 text-center truncate px-0.5">
                            {formData.polaroidCaptions[index]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {formData.stickers.includes('cake') && (
                  <img src="/assets/birthday_cake.png" alt="Cake" className="w-8 h-8 object-contain" />
                )}
                {formData.stickers.includes('balloon') && (
                  <img src="/assets/balloon.png" alt="Balloon" className="w-8 h-8 object-contain" />
                )}
                {formData.stickers.includes('gift') && (
                  <img src="/assets/gift_box.png" alt="Gift" className="w-8 h-8 object-contain" />
                )}
                {formData.stickers.includes('star') && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 8.26H23l-7 5.09 2.68 8.25L12 18.52l-6.68 5.08L8 15.35 1 10.26h8.1z"/></svg>
                )}
              </div>

            </div>

            {/* Share & QR Panel (Appears after generating) */}
            {shareUrl && (
              <div className="mt-6 bg-white/95 backdrop-blur-md rounded-3xl p-6 border-2 border-dashed border-pink-300 shadow-xl space-y-4">
                <div className="flex items-center gap-3 border-b border-pink-100 pb-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">Share Your Birthday Card</h3>
                    <p className="text-[10px] text-slate-500 font-semibold">Copy the link below to share with the recipient.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Share Link</label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      readOnly
                      value={shareUrl}
                      className="flex-1 text-[10px] px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 font-mono truncate focus:outline-none"
                      onClick={e => e.target.select()}
                    />
                    <button
                      type="button"
                      onClick={copyShareLink}
                      className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-[#FF6B8B] hover:bg-[#e05372] text-white font-black text-xs shadow-md transition-colors"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                      {copiedLink ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
