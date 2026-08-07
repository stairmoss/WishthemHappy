import React from 'react';
import { PlusCircle, LayoutDashboard, Home } from 'lucide-react';

export function Navbar({ onNavigate, currentRoute = 'home' }) {

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-200 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <img 
              src="/assets/logo.png" 
              alt="Birthday Wishes Logo" 
              className="w-full h-full object-contain rounded-2xl bg-white/90 p-1"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl md:text-2xl font-black text-slate-900">
                WishThemHappy
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-extrabold transition-colors ${
              currentRoute === 'home'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-extrabold transition-colors ${
              currentRoute === 'dashboard'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Explore Wishes</span>
          </button>


          {/* Create Card CTA */}
          <button
            onClick={() => onNavigate('create')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs md:text-sm shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Wish Card</span>
          </button>
        </nav>

      </div>
    </header>
  );
}
