import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Sparkles, Compass } from 'lucide-react';

export function ExperienceGateModal({ recipientName, onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(11, 14, 20, 0.92)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#FFF',
        textAlign: 'center'
      }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          maxWidth: '480px',
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '28px',
          padding: '48px 32px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid #F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F59E0B'
          }}
        >
          <Sparkles size={32} />
        </div>

        <div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F59E0B', fontWeight: 600 }}>
            A Gift For {recipientName || 'You'}
          </span>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '2rem', marginTop: '8px', color: '#FFF' }}>
            Unfold The Story
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '0.95rem', marginTop: '12px', lineHeight: 1.6 }}>
            For the most immersive experience, turn on your device's sound and find a cozy spot.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#CBD5E1', fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '30px' }}>
          <Volume2 size={16} color="#38BDF8" />
          <span>Spatial Audio Enabled</span>
        </div>

        <button
          onClick={onStart}
          style={{
            marginTop: '12px',
            width: '100%',
            padding: '16px 32px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #D96B43 0%, #D4A373 100%)',
            color: '#111111',
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.03em',
            boxShadow: '0 10px 25px rgba(217, 107, 67, 0.4)',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <Compass size={20} />
          Begin Experience
        </button>
      </motion.div>
    </motion.div>
  );
}
