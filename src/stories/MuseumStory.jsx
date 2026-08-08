import React from 'react';
import { motion } from 'framer-motion';
import { PolaroidCluster } from '../components/viewer/PolaroidCluster';
import { VoiceNoteCard } from '../components/viewer/VoiceNoteCard';
import { HiddenMemoryNode } from '../components/viewer/HiddenMemoryNode';
import { RevealCanvas } from '../components/viewer/RevealCanvas';
import { Award, Compass } from 'lucide-react';

export function MuseumStory({ story }) {
  const meta = story.meta || {};
  const chapters = story.chapters || [];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {chapters.map((chap) => {
        if (chap.type === 'PROLOGUE') {
          return (
            <section key={chap.id} style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '100px 24px' }}>
              <div className="badge-pill" style={{ borderColor: 'var(--accent-gold)' }}>
                <Award size={14} /> The Museum Exhibit of {meta.recipientName}
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'var(--font-title)', margin: '24px 0' }}>
                {chap.title}
              </h1>
              <p style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-muted)', maxWidth: '640px' }}>
                {chap.subtitle}
              </p>
              {chap.coverImage && (
                <div style={{ marginTop: '40px', padding: '16px', background: '#000', borderRadius: '12px', border: '8px solid var(--accent-gold)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                  <img src={chap.coverImage} alt="Exhibit Cover" style={{ maxWidth: '650px', width: '100%', borderRadius: '4px' }} />
                </div>
              )}
            </section>
          );
        }

        if (chap.type === 'TIMELINE') {
          return (
            <section key={chap.id} style={{ padding: '80px 0' }}>
              <div className="container">
                <h2 style={{ fontSize: '2.4rem', textAlign: 'center', marginBottom: '40px' }}>{chap.title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                  {(chap.milestones || []).map((m, i) => (
                    <motion.div key={i} whileHover={{ y: -6 }} className="glass-panel" style={{ padding: '24px', borderTop: '4px solid var(--accent-gold)' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)' }}>EXHIBIT #{i + 1} — {m.year}</span>
                      <h3 style={{ fontSize: '1.3rem', margin: '8px 0' }}>{m.title}</h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-body)' }}>{m.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (chap.type === 'MEDIA_VAULT') {
          return (
            <section key={chap.id} style={{ padding: '80px 0' }}>
              <div className="container">
                <h2 style={{ fontSize: '2.4rem', textAlign: 'center', marginBottom: '40px' }}>{chap.title}</h2>
                <PolaroidCluster photos={chap.photos || []} />
              </div>
            </section>
          );
        }

        if (chap.type === 'VOICE_NOTES') {
          return (
            <section key={chap.id} style={{ padding: '80px 0' }}>
              <div className="container">
                <h2 style={{ fontSize: '2.4rem', textAlign: 'center', marginBottom: '40px' }}>{chap.title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                  {(chap.audioNotes || []).map((note, nIdx) => (
                    <VoiceNoteCard key={nIdx} note={note} />
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (chap.type === 'HIDDEN_MEMORIES') {
          return (
            <section key={chap.id} style={{ padding: '80px 0' }}>
              <div className="container">
                <h2 style={{ fontSize: '2.4rem', textAlign: 'center', marginBottom: '40px' }}>{chap.title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                  {(chap.envelopes || []).map((env, eIdx) => (
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
