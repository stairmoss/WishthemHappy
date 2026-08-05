import React from 'react';
import { THEME_PRESETS } from '../../themes/ThemeEngine';
import { Check } from 'lucide-react';

export function ThemeSelector({ selectedTheme = 'SOFT_DREAMY', onSelect }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
      {THEME_PRESETS.map((t) => {
        const isSelected = selectedTheme === t.id;
        return (
          <div
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="glass-panel"
            style={{
              padding: '20px',
              cursor: 'pointer',
              border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-color)',
              position: 'relative'
            }}
          >
            {/* Color Palette Swatch */}
            <div style={{ display: 'flex', height: '40px', borderRadius: '8px', overflow: 'hidden', marginBottom: '14px', border: '1px solid rgba(0,0,0,0.1)' }}>
              <div style={{ flex: 2, background: t.previewBg }} />
              <div style={{ flex: 1, background: t.previewAcc }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-headline)' }}>{t.name}</h4>
              {isSelected && <Check size={18} color="var(--accent-gold)" />}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', marginTop: '6px', lineHeight: 1.4 }}>
              {t.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
