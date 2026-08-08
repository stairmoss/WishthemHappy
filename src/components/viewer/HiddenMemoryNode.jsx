import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';

export function HiddenMemoryNode({ envelope }) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onClick={() => setIsRevealed(!isRevealed)}
      style={{
        cursor: 'pointer',
        perspective: 1000
      }}
    >
      <motion.div
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          minHeight: '230px'
        }}
      >
        {/* FRONT: Sealed Envelope with Asset Pack Wax Seal */}
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '12px',
            border: '2px dashed var(--accent-gold)'
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src="/assets/letters/envelope.png"
              alt="Envelope"
              style={{ width: '80px', height: '60px', objectFit: 'contain' }}
            />
            <img
              src="/assets/scrapbook/wax_seal.png"
              alt="Wax Seal"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '36px',
                height: '36px',
                objectFit: 'contain'
              }}
            />
          </div>

          <h4 style={{ fontSize: '1.2rem', color: 'var(--text-headline)' }}>{envelope.title}</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
            <Lock size={14} />
            <span>Tap to unseal secret note</span>
          </div>
        </div>

        {/* BACK: Revealed Content */}
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '14px',
            background: 'var(--surface-card)',
            borderColor: 'var(--accent-primary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
            <Unlock size={14} />
            <span>Unsealed Secret Memory</span>
          </div>
          <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.45rem', color: 'var(--text-headline)', lineHeight: 1.4 }}>
            "{envelope.content}"
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tap again to reseal</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
