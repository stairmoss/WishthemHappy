import React from 'react';
import { BookOpen, Film, Award, Zap, Heart } from 'lucide-react';

export const STORY_TYPES = [
  {
    id: 'SCRAPBOOK',
    name: 'Scrapbook Storybook',
    description: 'Hand-drawn paper aesthetic, taped polaroids, floating stickers, and organic warm storytelling.',
    icon: Heart,
    accent: '#D96B43'
  },
  {
    id: 'MUSEUM',
    name: 'Museum Exhibit',
    description: 'Gallery framed pictures, spotlight plaques, and elegant curation for milestone birthdays.',
    icon: Award,
    accent: '#D4A373'
  },
  {
    id: 'MOVIE',
    name: 'Cinematic Documentary',
    description: 'Widescreen letterbox video aesthetic, atmospheric music, and dramatic film chapter reveals.',
    icon: Film,
    accent: '#818CF8'
  },
  {
    id: 'WRAPPED',
    name: 'Birthday Wrapped',
    description: 'Spotify-inspired bold stats, high-contrast neon cards, top memories of the year.',
    icon: Zap,
    accent: '#1DB954'
  },
  {
    id: 'DIARY',
    name: 'Intimate Journal',
    description: 'Personal handwritten notes, bookmark ribbons, and quiet reflective journal pages.',
    icon: BookOpen,
    accent: '#A64B2A'
  }
];

export function StoryTypePicker({ selectedType = 'SCRAPBOOK', onSelect }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
      {STORY_TYPES.map((st) => {
        const IconComponent = st.icon;
        const isSelected = selectedType === st.id;

        return (
          <div
            key={st.id}
            onClick={() => onSelect(st.id)}
            className="glass-panel"
            style={{
              padding: '24px',
              cursor: 'pointer',
              border: isSelected ? `2px solid ${st.accent}` : '1px solid var(--border-color)',
              boxShadow: isSelected ? `0 10px 25px ${st.accent}33` : 'var(--shadow-card)',
              transition: 'all 0.25s ease',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${st.accent}22`,
                color: st.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}
            >
              <IconComponent size={24} />
            </div>

            <h4 style={{ fontSize: '1.15rem', color: 'var(--text-headline)', marginBottom: '8px' }}>{st.name}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>{st.description}</p>
          </div>
        );
      })}
    </div>
  );
}
