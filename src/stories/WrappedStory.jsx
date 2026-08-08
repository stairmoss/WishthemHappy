import React from 'react';
import { motion } from 'framer-motion';
import { PolaroidCluster } from '../components/viewer/PolaroidCluster';
import { VoiceNoteCard } from '../components/viewer/VoiceNoteCard';
import { HiddenMemoryNode } from '../components/viewer/HiddenMemoryNode';
import { RevealCanvas } from '../components/viewer/RevealCanvas';
import { Music2, Zap, Heart, Flame } from 'lucide-react';

export function WrappedStory({ story }) {
  const meta = story.meta || {};
  const chapters = story.chapters || [];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {chapters.map((chap) => {
        if (chap.type === 'PROLOGUE') {
          return (
            <section key={chap.id} style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px' }}>
              <div className="badge-pill" style={{ background: 'var(--accent-primary)', color: 'var(--text-headline)', borderColor: 'var(--accent-primary)' }}>
                <Zap size={14} /> YOUR BIRTHDAY WRAPPED 2026
              </div>
              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, color: 'var(--text-headline)', margin: '20px 0' }}>
                {meta.recipientName.toUpperCase()}
              </h1>
              <p style={{ fontSize: '1.4rem', color: 'var(--text-body)', maxWidth: '600px' }}>
                Top memory of the year. #1 best human.
              </p>
            </section>
          );
        }

        if (chap.type === 'TIMELINE') {
          return (
            <section key={chap.id} style={{ padding: '80px 0' }}>
              <div className="container">
                <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: 'var(--text-headline)', marginBottom: '40px' }}>{chap.title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                  {(chap.milestones || []).map((m, i) => (
                    <div key={i} className="glass-panel" style={{ padding: '24px' }}>
                      <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-primary)' }}>0{i + 1}</span>
                      <h3 style={{ fontSize: '1.4rem', color: 'var(--text-headline)', margin: '8px 0' }}>{m.title} ({m.year})</h3>
                      <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>{m.description}</p>
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
                <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: 'var(--text-headline)', marginBottom: '40px' }}>{chap.title}</h2>
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
