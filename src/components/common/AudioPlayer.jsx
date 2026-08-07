import React from 'react';
import { Music, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function AudioPlayer({ trackTitle = "Background Soundscape", isPlaying, isMuted, onTogglePlay, onToggleMute }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 18px',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '40px',
        boxShadow: 'var(--shadow-card)',
        backdropFilter: 'blur(12px)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Music size={16} color="var(--accent-gold)" />
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-headline)', maxWidth: '140px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {trackTitle}
        </span>
      </div>

      {/* Soundwave equalizer indicator */}
      {isPlaying && !isMuted && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '16px', padding: '0 4px' }}>
          <motion.div animate={{ height: ['4px', '14px', '6px'] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ width: '3px', background: 'var(--accent-primary)', borderRadius: '2px' }} />
          <motion.div animate={{ height: ['12px', '4px', '16px'] }} transition={{ repeat: Infinity, duration: 0.6 }} style={{ width: '3px', background: 'var(--accent-gold)', borderRadius: '2px' }} />
          <motion.div animate={{ height: ['6px', '16px', '8px'] }} transition={{ repeat: Infinity, duration: 0.9 }} style={{ width: '3px', background: 'var(--accent-secondary)', borderRadius: '2px' }} />
        </div>
      )}

      <button
        onClick={onTogglePlay}
        aria-label="Toggle Play/Pause"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'var(--accent-primary)',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease'
        }}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
      </button>

      <button
        onClick={onToggleMute}
        aria-label="Toggle Mute"
        style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </motion.div>
  );
}
