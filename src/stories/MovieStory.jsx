import React from 'react';
import { motion } from 'framer-motion';
import { PolaroidCluster } from '../components/viewer/PolaroidCluster';
import { VoiceNoteCard } from '../components/viewer/VoiceNoteCard';
import { HiddenMemoryNode } from '../components/viewer/HiddenMemoryNode';
import { RevealCanvas } from '../components/viewer/RevealCanvas';
import { Film, Play } from 'lucide-react';

export function MovieStory({ story }) {
  const meta = story.meta || {};
  const chapters = story.chapters || [];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {chapters.map((chap) => {
        if (chap.type === 'PROLOGUE') {
          return (
            <section key={chap.id} style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '100px 24px' }}>
              <div className="badge-pill">
                <Film size={14} /> An Aurora Motion Picture
              </div>
              <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontFamily: 'var(--font-title)', margin: '24px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {chap.title}
              </h1>
              <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
                {chap.subtitle}
              </p>
              {chap.coverImage && (
                <div style={{ marginTop: '40px', position: 'relative', width: '100%', maxWidth: '800px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
                  <img src={chap.coverImage} alt="Movie Still" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: '24px', left: '24px', color: '#FFF', textAlign: 'left' }}>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Starring</span>
                    <h3 style={{ fontSize: '1.5rem' }}>{meta.recipientName}</h3>
                  </div>
                </div>
              )}
            </section>
          );
        }

        if (chap.type === 'TIMELINE') {
          return (
            <section key={chap.id} style={{ padding: '80px 0' }}>
              <div className="container">
                <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>{chap.title}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {(chap.milestones || []).map((m, i) => (
                    <div key={i} className="glass-panel" style={{ padding: '32px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
                      <div style={{ flex: 1, minWidth: '260px' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 700 }}>SCENE #{i + 1} — {m.year}</span>
                        <h3 style={{ fontSize: '1.6rem', marginTop: '6px' }}>{m.title}</h3>
                        <p style={{ marginTop: '8px', color: 'var(--text-body)' }}>{m.description}</p>
                      </div>
                      {m.image && (
                        <img src={m.image} alt={m.title} style={{ width: '220px', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />
                      )}
                    </div>
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
                <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>{chap.title}</h2>
                <PolaroidCluster photos={chap.photos || []} />
              </div>
            </section>
          );
        }

        if (chap.type === 'VOICE_NOTES') {
          return (
            <section key={chap.id} style={{ padding: '80px 0' }}>
              <div className="container">
                <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>{chap.title}</h2>
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
                <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>{chap.title}</h2>
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
