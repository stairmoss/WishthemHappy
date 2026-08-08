import React from 'react';
import { motion } from 'framer-motion';
import { SectionDivider } from '../components/common/SectionDivider';
import { FloatingDecoration } from '../components/common/FloatingDecoration';
import { PolaroidCluster } from '../components/viewer/PolaroidCluster';
import { VoiceNoteCard } from '../components/viewer/VoiceNoteCard';
import { HiddenMemoryNode } from '../components/viewer/HiddenMemoryNode';
import { RevealCanvas } from '../components/viewer/RevealCanvas';
import { Film } from 'lucide-react';

export function ScrapbookStory({ story }) {
  const meta = story?.meta || {};
  const chapters = story?.chapters || [];

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* Floating ambient scrapbook decorations */}
      <FloatingDecoration type="washi_tape" top="4%" left="3%" size={40} rotate={-8} />
      <FloatingDecoration type="sakura_petals" top="12%" right="5%" size={28} delay={1} />
      <FloatingDecoration type="coffee_stains" top="30%" left="2%" size={48} delay={2} />
      <FloatingDecoration type="ribbon" top="55%" right="4%" size={32} delay={1.5} />
      <FloatingDecoration type="feather" top="75%" left="5%" size={36} delay={0.5} />

      {chapters.map((chap) => {
        switch (chap.type) {
          case 'PROLOGUE':
            return (
              <section key={chap.id} style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '120px 24px 60px 24px', textAlign: 'center', position: 'relative' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '820px', position: 'relative' }}>
                  
                  {/* Circular Love Mail Postmark Stamp */}
                  <div style={{ position: 'absolute', top: '-20px', right: '10px' }} className="postmark-stamp">
                    Love Mail 2026
                  </div>

                  {/* Ribbon Banner */}
                  <div className="ribbon-banner" style={{ marginBottom: '24px' }}>
                    {meta.recipientName || 'Birthday'}'s Scrapbook
                  </div>

                  <h1 style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)', fontFamily: 'var(--font-title)', color: 'var(--text-headline)', marginBottom: '16px' }}>
                    {chap.title || `For ${meta.recipientName}`}
                  </h1>
                  {chap.subtitle && (
                    <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.6rem', color: 'var(--text-body)', marginBottom: '36px' }}>
                      "{chap.subtitle}"
                    </p>
                  )}

                  {chap.coverImage && (
                    <div style={{ position: 'relative', display: 'inline-block', maxWidth: '620px', margin: '0 auto' }}>
                      <div style={{ position: 'absolute', top: '-24px', left: '-30px', display: 'flex', gap: '4px', opacity: 0.8 }}>
                        <Film size={36} color="var(--text-headline)" />
                      </div>

                      <div className="postage-stamp-frame">
                        <img src={chap.coverImage} alt="Cover" style={{ width: '100%', borderRadius: '2px', maxHeight: '420px', objectFit: 'cover' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                          <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.5rem', color: '#3E2723' }}>
                            {chap.quote || `Happy Birthday ${meta.recipientName || ''}!`}
                          </p>
                          <span style={{ fontSize: '0.8rem', padding: '2px 8px', background: 'var(--accent-gold)', color: '#FFF', borderRadius: '4px', fontWeight: 700 }}>
                            MEMORIES
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>

                <div style={{ marginTop: '60px', width: '100%' }}>
                  <SectionDivider type="clouds" color="var(--bg-secondary)" />
                </div>
              </section>
            );

          case 'TIMELINE':
            if (!chap.milestones || chap.milestones.length === 0) return null;
            return (
              <section key={chap.id} style={{ padding: '100px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
                <div className="container">
                  <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <span className="ribbon-banner" style={{ background: 'var(--accent-gold)', marginBottom: '12px' }}>
                      OUR MILESTONES
                    </span>
                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)', color: 'var(--text-headline)', marginTop: '8px' }}>{chap.title}</h2>
                    {chap.subtitle && <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{chap.subtitle}</p>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    {chap.milestones.map((m, mIdx) => (
                      <motion.div
                        key={mIdx}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: mIdx * 0.1 }}
                        className="torn-paper-card"
                      >
                        <div style={{ position: 'absolute', top: '-10px', left: '20px', width: '60px', height: '14px', background: 'rgba(212, 163, 115, 0.6)', transform: 'rotate(-4deg)' }} />

                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          CHAPTER {mIdx + 1} — {m.year}
                        </span>
                        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-headline)', margin: '8px 0' }}>{m.title}</h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{m.description}</p>
                        
                        {m.image && (
                          <div className="postage-stamp-frame" style={{ marginTop: '16px', padding: '8px' }}>
                            <img src={m.image} alt={m.title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '2px' }} />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '80px', width: '100%' }}>
                  <SectionDivider type="waves" color="var(--bg-primary)" />
                </div>
              </section>
            );

          case 'MEDIA_VAULT':
            if (!chap.photos || chap.photos.length === 0) return null;
            return (
              <section key={chap.id} style={{ padding: '100px 0' }}>
                <div className="container">
                  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span className="ribbon-banner" style={{ background: '#4A7C59', marginBottom: '12px' }}>
                      PHOTO VAULT
                    </span>
                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)', marginTop: '8px' }}>{chap.title}</h2>
                    {chap.subtitle && <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{chap.subtitle}</p>}
                  </div>
                  <PolaroidCluster photos={chap.photos} />
                </div>
              </section>
            );

          case 'VOICE_NOTES':
            if (!chap.audioNotes || chap.audioNotes.length === 0) return null;
            return (
              <section key={chap.id} style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
                <div className="container">
                  <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>{chap.title}</h2>
                    {chap.subtitle && <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{chap.subtitle}</p>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {chap.audioNotes.map((note, nIdx) => (
                      <VoiceNoteCard key={nIdx} note={note} />
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'HIDDEN_MEMORIES':
            if (!chap.envelopes || chap.envelopes.length === 0) return null;
            return (
              <section key={chap.id} style={{ padding: '100px 0' }}>
                <div className="container">
                  <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>{chap.title}</h2>
                    {chap.subtitle && <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{chap.subtitle}</p>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                    {chap.envelopes.map((env, eIdx) => (
                      <HiddenMemoryNode key={eIdx} envelope={env} />
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'CLIMAX_REVEAL':
            return <RevealCanvas key={chap.id} climaxData={chap} recipientName={meta.recipientName} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
