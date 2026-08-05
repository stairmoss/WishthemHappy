import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { ChapterRenderer } from '../viewer/ChapterRenderer';
import { ThemeEngine } from '../../themes/ThemeEngine';

export function PreviewViewport({ story }) {
  const [deviceMode, setDeviceMode] = useState('desktop'); // desktop or mobile

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      {/* Device Mode Toggle */}
      <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.06)', padding: '4px', borderRadius: '30px' }}>
        <button
          onClick={() => setDeviceMode('desktop')}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            background: deviceMode === 'desktop' ? 'var(--surface-card)' : 'transparent',
            fontWeight: 600,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Monitor size={16} /> Desktop View
        </button>
        <button
          onClick={() => setDeviceMode('mobile')}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            background: deviceMode === 'mobile' ? 'var(--surface-card)' : 'transparent',
            fontWeight: 600,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Smartphone size={16} /> Mobile Preview
        </button>
      </div>

      {/* Simulator Frame */}
      <div
        style={{
          width: deviceMode === 'mobile' ? '375px' : '100%',
          maxWidth: '1080px',
          height: '650px',
          border: '12px solid #1E1E1E',
          borderRadius: deviceMode === 'mobile' ? '36px' : '16px',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          position: 'relative',
          background: 'var(--bg-primary)'
        }}
      >
        <ThemeEngine themeId={story?.meta?.themeId || 'SOFT_DREAMY'}>
          <ChapterRenderer story={story} />
        </ThemeEngine>
      </div>
    </div>
  );
}
