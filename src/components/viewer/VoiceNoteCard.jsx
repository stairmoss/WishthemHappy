import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Mic, Heart, User } from 'lucide-react';

export function VoiceNoteCard({ note }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleVoiceNote = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(note.audioUrl || "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a81630.mp3");
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(217, 107, 67, 0.15)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Mic size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-headline)' }}>{note.sender}</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {note.relation || 'Friend'} • {note.duration || '0:30'}
            </span>
          </div>
        </div>

        <button
          onClick={toggleVoiceNote}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: isPlaying ? 'var(--accent-gold)' : 'var(--accent-primary)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease'
          }}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '3px' }} />}
        </button>
      </div>

      {note.quote && (
        <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.5 }}>
          "{note.quote}"
        </p>
      )}

      {/* Simulated equalizer soundwave */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '28px', padding: '0 8px', background: 'rgba(0,0,0,0.04)', borderRadius: '12px' }}>
        {[40, 70, 30, 90, 50, 80, 20, 60, 100, 45, 85, 30, 65, 95, 40, 70, 35].map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: isPlaying ? [`${h * 0.2}%`, `${h}%`, `${h * 0.4}%`] : `${h * 0.3}%` }}
            transition={{ repeat: isPlaying ? Infinity : 0, duration: 0.5 + (i % 3) * 0.2 }}
            style={{
              flex: 1,
              background: isPlaying ? 'var(--accent-primary)' : 'var(--accent-gold)',
              borderRadius: '4px',
              minHeight: '4px'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
