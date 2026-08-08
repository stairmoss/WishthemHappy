import React from 'react';
import { motion } from 'framer-motion';
import { PolaroidCluster } from '../components/viewer/PolaroidCluster';
import { VoiceNoteCard } from '../components/viewer/VoiceNoteCard';
import { HiddenMemoryNode } from '../components/viewer/HiddenMemoryNode';
import { RevealCanvas } from '../components/viewer/RevealCanvas';
import { Feather, Moon, Paperclip } from 'lucide-react';
import { FloatingDecoration } from '../components/common/FloatingDecoration';

export function DiaryStory({ story }) {
  const meta = story?.meta || {};
  const chapters = story?.chapters || [];

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* Journal Ambient Decorations */}
      <FloatingDecoration type="coffee_stains" top="6%" left="3%" size={54} delay={0} />
      <FloatingDecoration type="feather" top="18%" right="4%" size={32} delay={1} />
      <FloatingDecoration type="sakura_petals" top="42%" left="4%" size={30} delay={1.5} />
      <FloatingDecoration type="ribbon" top="70%" right="5%" size={36} delay={2} />

      {chapters.map((chap) => {
        if (chap.type === 'PROLOGUE') {
          return (
            <section key={chap.id} style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 60px 24px' }}>
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ maxWidth: '780px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-24px', left: '16px' }} className="wax-seal-badge">
                  A
                </div>

                <div style={{ position: 'absolute', top: '-16px', right: '30px', color: '#8D6E63' }}>
                  <Paperclip size={32} />
                </div>

                <div className="filigree-journal-card">
                  <span style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.4rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Personal Journal Entry
                  </span>

                  <h1 style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', fontFamily: 'var(--font-handwriting)', margin: '16px 0', color: 'var(--text-headline)' }}>
                    {chap.title || `${meta.recipientName}'s Personal Journal`}
                  </h1>

                  <p style={{ fontSize: '1.45rem', fontFamily: 'var(--font-handwriting)', color: 'var(--text-body)', lineHeight: 1.6 }}>
                    "{chap.subtitle || 'Every page written here carries warm thoughts, laughter, and timeless memories.'}"
                  </p>

                  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-muted)' }}>
                      DATE: {meta.birthdayDate || '2026'}
                    </span>
                    <span>•</span>
                    <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-muted)' }}>
                      WRITTEN BY: {meta.senderName || 'Loved Ones'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </section>
          );
        }

        if (chap.type === 'TIMELINE') {
          if (!chap.milestones || chap.milestones.length === 0) return null;
          return (
            <section key={chap.id} style={{ padding: '90px 0', background: 'var(--bg-secondary)' }}>
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                  <span style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.6rem', color: 'var(--accent-primary)' }}>
                    — Chapter Entries —
                  </span>
                  <h2 style={{ fontSize: '2.6rem', fontFamily: 'var(--font-handwriting)', marginTop: '4px' }}>{chap.title}</h2>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{chap.subtitle}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
                  {chap.milestones.map((m, i) => {
                    const isEven = i % 2 === 0;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={isEven ? "dot-grid-card" : "scorched-journal-card"}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-handwriting)', color: 'var(--accent-primary)', fontWeight: 700 }}>
                            Entry #{i + 1} — {m.year}
                          </span>
                          {isEven ? <Moon size={20} color="var(--accent-gold)" /> : <Feather size={20} color="var(--accent-primary)" />}
                        </div>

                        <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-handwriting)', margin: '6px 0', color: 'var(--text-headline)' }}>
                          {m.title}
                        </h3>

                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                          {m.description}
                        </p>

                        {m.image && (
                          <div style={{ marginTop: '16px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                            <img src={m.image} alt={m.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        if (chap.type === 'MEDIA_VAULT') {
          if (!chap.photos || chap.photos.length === 0) return null;
          return (
            <section key={chap.id} style={{ padding: '90px 0' }}>
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-handwriting)' }}>{chap.title}</h2>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{chap.subtitle}</p>
                </div>
                <PolaroidCluster photos={chap.photos} />
              </div>
            </section>
          );
        }

        if (chap.type === 'VOICE_NOTES') {
          if (!chap.audioNotes || chap.audioNotes.length === 0) return null;
          return (
            <section key={chap.id} style={{ padding: '90px 0', background: 'var(--bg-secondary)' }}>
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                  <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-handwriting)' }}>{chap.title}</h2>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{chap.subtitle}</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                  {chap.audioNotes.map((note, nIdx) => (
                    <VoiceNoteCard key={nIdx} note={note} />
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (chap.type === 'HIDDEN_MEMORIES') {
          if (!chap.envelopes || chap.envelopes.length === 0) return null;
          return (
            <section key={chap.id} style={{ padding: '90px 0' }}>
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                  <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-handwriting)' }}>{chap.title}</h2>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{chap.subtitle}</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                  {chap.envelopes.map((env, eIdx) => (
                    <HiddenMemoryNode key={eIdx} envelope={env} />
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (chap.type === 'CLIMAX_REVEAL') {
          return <RevealCanvas key={chap.id} climaxData={chap} recipientName={meta.recipientName} />;
        }

        return null;
      })}
    </div>
  );
}
