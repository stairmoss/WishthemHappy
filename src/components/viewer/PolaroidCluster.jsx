import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Calendar, Sparkles } from 'lucide-react';
import { ImageWithLoader } from '../common/ImageWithLoader';

export function PolaroidCluster({ photos = [] }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Default sample polaroids with genuine birthday celebration photos
  const defaultPhotos = [
    {
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      caption: 'Birthday Party Celebration!',
      date: '25th Birthday'
    },
    {
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      caption: 'Sparkling Birthday Cake & Candles',
      date: 'Make A Wish'
    },
    {
      url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
      caption: 'Friends & Festive Cheer',
      date: 'Party Moments'
    },
    {
      url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
      caption: 'Unforgettable Birthday Surprise',
      date: 'Sweet Memories'
    }
  ];

  const displayPhotos = photos.length > 0 ? photos : defaultPhotos;
  const rotations = [-3, 2, -2, 4, -3, 3];

  const StickerOverlay = ({ index }) => {
    const type = index % 4;
    if (type === 0) {
      return (
        <div className="absolute -top-3 right-4 w-16 h-6 bg-slate-200/80 backdrop-blur-xs border border-dashed border-slate-400 rotate-[-6deg] shadow-sm z-30 pointer-events-none rounded-xs flex items-center justify-center">
          <span className="text-[9px] font-extrabold text-slate-700 tracking-wider uppercase opacity-80">Washi Tape</span>
        </div>
      );
    } else if (type === 1) {
      return (
        <div className="absolute -top-3 right-3 w-10 h-10 bg-amber-100 border-2 border-dashed border-amber-600 rounded-xs rotate-[8deg] shadow-md z-30 pointer-events-none flex flex-col items-center justify-center p-0.5">
          <span className="text-[7px] font-black text-amber-800 tracking-tighter">PARTY</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-amber-800" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 8.26H23l-7 5.09 2.68 8.25L12 18.52l-6.68 5.08L8 15.35 1 10.26h8.1z"/></svg>
        </div>
      );
    } else if (type === 2) {
      return (
        <div className="absolute -top-3 right-3 w-9 h-9 rounded-full bg-slate-800 text-amber-200 border-2 border-slate-600 shadow-md z-30 pointer-events-none flex items-center justify-center font-bold text-xs rotate-[-12deg]">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 8.26H23l-7 5.09 2.68 8.25L12 18.52l-6.68 5.08L8 15.35 1 10.26h8.1z"/></svg>
        </div>
      );
    } else {
      return (
        <div className="absolute -top-4 right-6 w-5 h-9 border-2 border-slate-400 rounded-full rotate-[15deg] shadow-sm z-30 pointer-events-none bg-slate-200/50" />
      );
    }
  };

  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center">
        {displayPhotos.map((phsoto, index) => {
          const rot = rotation[index % rotations.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              style={{ transform: `rotate(${rot}deg)` }}
              className="relative group max-w-[260px] mx-auto w-full"
            >
              {/* Decorative Sticker Overlay */}
              <StickerOverlay index={index} />

              {/* Polaroid Frame */}
              <div
                className="polaroid-frame cursor-pointer select-none bg-white transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Photo Image Container */}
                <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-sm">
                  <ImageWithLoader
                    src={photo.url}
                    alt={photo.caption || 'Polaroid Memory'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Handwritten Polaroid Caption Area */}
                <div className="pt-3 pb-1 text-center">
                  <p className="font-handwriting text-lg text-slate-800 font-bold leading-tight line-clamp-2">
                    {photo.caption || 'Birthday Snapshot'}
                  </p>
                  {photo.date && (
                    <div className="flex items-center justify-center gap-1 mt-1 text-[11px] font-semibold text-slate-500">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{photo.date}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full-Screen Zoom Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
              className="max-w-xl w-full bg-white rounded-3xl p-6 shadow-2xl relative border-4 border-white"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full max-h-[60vh] object-cover rounded-2xl shadow-md"
              />

              <div className="mt-4 text-center">
                <p className="font-handwriting text-2xl font-bold text-slate-900">
                  {selectedPhoto.caption}
                </p>
                {selectedPhoto.date && (
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 mt-2 inline-block">
                    {selectedPhoto.date}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
