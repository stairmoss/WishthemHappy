import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { RoughNotationText } from '../components/common/RoughNotationText';
import { getSavedWishes } from '../utils/wishStorage';
import { PlusCircle, Play } from 'lucide-react';

export function HomePage({ onNavigate }) {
  const [wishes] = useState(getSavedWishes());

  return (
    <div className="min-h-screen bg-brandBg flex flex-col font-sans text-slate-800">
      <Navbar onNavigate={onNavigate} currentRoute="home" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
              Create{' '}
              <RoughNotationText type="highlight" color="#FFD1DC" animationDuration={1000}>
                <span className="text-[#4A2E35]">
                  Awesome Birthday Wishes
                </span>
              </RoughNotationText>{' '}
              That Wow Everyone!
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Send interactive birthday cards featuring a cute animated companion, interactive candle blowout animations, customized music, custom sticker styling, and shareable QR codes!
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('create')}
                className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 active:translate-y-0"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Build A Wish Card Now</span>
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-base border border-slate-200 shadow-md hover:shadow-lg transition-all"
              >
                <Play className="w-5 h-5 text-slate-700 fill-slate-700" />
                <span>Explore Preset Wishes</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Birthday Celebration Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-xl flex flex-col items-center justify-center max-w-sm w-full min-h-[320px]">
              <div className="relative flex items-center justify-center w-full my-4">
                {/* Floating balloon */}
                <img 
                  src="/assets/balloon.png" 
                  alt="Balloon" 
                  className="w-24 h-24 object-contain absolute -top-12 -left-4 animate-bounce drop-shadow-md"
                  style={{ animationDuration: '4s' }}
                />
                <img 
                  src="/assets/birthday_cake.png" 
                  alt="Birthday Cake" 
                  className="w-56 h-56 object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Preset Wishes / Showcase Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            <RoughNotationText type="underline" color="#FF6B8B" strokeWidth={3}>
              Ready-Made Birthday Wishes
            </RoughNotationText>
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Click any card to open the interactive 3D birthday wish viewer!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              onClick={() => onNavigate('story-viewer', wish.id)}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-black text-xs">
                    Turning {wish.age}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 capitalize">
                    {wish.theme} theme
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-slate-700 transition-colors">
                  {wish.recipientName}
                </h3>
                <p className="text-xs text-slate-500 font-semibold mb-3">
                  From: {wish.senderName}
                </p>

                <p className="text-xs text-slate-600 line-clamp-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 leading-relaxed italic">
                  "{wish.message}"
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs">
                    +
                  </div>
                  <span className="text-xs font-bold text-slate-700">Interactive Card</span>
                </div>
                <span className="text-xs font-black text-slate-800 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Open Card
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      <Footer onNavigate={onNavigate} />
    </div>
  );
}
