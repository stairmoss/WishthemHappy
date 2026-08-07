import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Send, MessageSquare } from 'lucide-react';

export function RevealCanvas({ climaxData = {}, recipientName = "Friend" }) {
  const [wishes, setWishes] = useState(climaxData.wishes || []);
  const [newWishName, setNewWishName] = useState('');
  const [newWishText, setNewWishText] = useState('');

  useEffect(() => {
    // Trigger confetti fireworks burst on mount/reveal
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: climaxData.confettiColors || ['#D96B43', '#D4A373', '#4A7C59']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: climaxData.confettiColors || ['#D96B43', '#D4A373', '#4A7C59']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!newWishText.trim()) return;
    const wishObj = {
      name: newWishName.trim() || 'Anonymous Friend',
      text: newWishText.trim(),
      time: 'Just now'
    };
    setWishes([wishObj, ...wishes]);
    setNewWishName('');
    setNewWishText('');
    confetti({ particleCount: 30, spread: 70, origin: { y: 0.7 } });
  };

  return (
    <div style={{ padding: '80px 0', textAlign: 'center', position: 'relative' }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}
      >
        <div className="badge-pill" style={{ marginBottom: '24px' }}>
          <Sparkles size={16} />
          The Final Celebration
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--text-headline)',
            lineHeight: 1.15,
            textShadow: '0 4px 20px rgba(217, 107, 67, 0.2)'
          }}
        >
          {climaxData.headline || `HAPPY BIRTHDAY, ${recipientName.toUpperCase()}!`}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.35rem',
            color: 'var(--text-body)',
            marginTop: '24px',
            lineHeight: 1.6,
            maxWidth: '640px',
            margin: '24px auto 0 auto'
          }}
        >
          {climaxData.subheadline || 'May your year be filled with endless joy, unforgettable adventures, and everlasting light.'}
        </p>

        {/* Wish Wall Section */}
        <div style={{ marginTop: '72px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <MessageSquare size={24} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>Birthday Wish Wall</h3>
          </div>

          {/* Add wish form */}
          <form
            onSubmit={handleAddWish}
            className="glass-panel"
            style={{ padding: '24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Your Name"
                value={newWishName}
                onChange={e => setNewWishName(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'rgba(255,255,255,0.7)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
            <textarea
              placeholder={`Write your birthday message for ${recipientName}...`}
              rows={3}
              value={newWishText}
              onChange={e => setNewWishText(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'rgba(255,255,255,0.7)',
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                alignSelf: 'flex-end',
                padding: '12px 24px',
                borderRadius: '30px',
                background: 'var(--accent-primary)',
                color: '#FFF',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Send size={16} />
              Leave a Wish
            </button>
          </form>

          {/* List of wishes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {wishes.map((w, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel"
                style={{ padding: '18px 24px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'var(--accent-gold)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                >
                  {w.name ? w.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h5 style={{ fontSize: '1rem', color: 'var(--text-headline)' }}>{w.name}</h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{w.time}</span>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', marginTop: '4px' }}>{w.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
