import React, { useEffect } from 'react';

export const THEME_PRESETS = [
  {
    id: 'SOFT_DREAMY',
    name: 'Soft & Dreamy',
    description: 'Very Light Soft Pink, Pastel Blush Pink, & Vibrant Rose',
    previewBg: '#FFF5F7',
    previewAcc: '#FF6B8B'
  },
  {
    id: 'LAVENDER_MINT',
    name: 'Lavender & Mint',
    description: 'Lavender, Mint, & Lemon Chiffon: Playful, sweet, and gentle.',
    previewBg: '#F5F3FF',
    previewAcc: '#D8B4FE'
  },
  {
    id: 'COSMIC_STARLIGHT',
    name: 'Cosmic Starlight',
    description: 'Deep midnight navy, glowing constellations, ambient gold sparkles.',
    previewBg: '#0B0E14',
    previewAcc: '#F59E0B'
  },
  {
    id: 'VINTAGE_SEPIA',
    name: 'Vintage Sepia',
    description: 'Typewriter fonts, sepia film grain, paper tape polaroids.',
    previewBg: '#EFE6D5',
    previewAcc: '#A64B2A'
  },
  {
    id: 'CYBER_NEON',
    name: 'Cyber Wrapped',
    description: 'Spotify-inspired high-contrast black, neon green & pink stat cards.',
    previewBg: '#121212',
    previewAcc: '#1DB954'
  }
];

export function ThemeEngine({ themeId = 'SOFT_DREAMY', children }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeId);
  }, [themeId]);

  return <div className="aurora-theme-wrapper" data-theme={themeId}>{children}</div>;
}
