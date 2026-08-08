import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { getSavedWishes } from '../utils/wishStorage';
import { PlusCircle, Eye, Share2, Sparkles, Check, Gift } from 'lucide-react';

export function DashboardPage({ onNavigate }) {
  const [wishes] = useState(getSavedWishes());
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyLink = (id) => {
    const url = `${window.location.origin}/#story/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-brandBg flex flex-col font-sans text-slate-800">
      <Navbar onNavigate={onNavigate} currentRoute="dashboard" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-wider">
              Community Gallery
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Birthday Wish Collection
            </h1>
            <p className="text-xs sm:text-sm -slate-500 font-semibold mt-1">
              Explore and share interactive anitextmated birthday cards!
            </p>
          </div>

          <button
            onClick={() => onNavigate('create')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create New Wish</span>
          </button>
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-black text-xs">
                    Turning {wish.age}
                  </span>
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                    {wish.theme}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">
                  {wish.recipientName}
                </h3>
                <p className="text-xs text-slate-500 font-semibold mb-3">
                  From: {wish.senderName}
                </p>

                <p className="text-xs text-slate-600 line-clamp-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/60 leading-relaxed italic">
                  "{wish.message}"
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('story-viewer', wish.id)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Eye className="w-4 h-4" /> Open Card
                </button>

                <button
                  onClick={() => handleCopyLink(wish.id)}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                >
                  {copiedId === wish.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedId === wish.id ? 'Copied' : 'Share'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
