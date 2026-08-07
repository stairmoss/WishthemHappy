import React from 'react';

export function SectionDivider({ type = 'clouds', color = 'var(--bg-secondary)', flip = false }) {
  if (type === 'clouds') {
    return (
      <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, transform: flip ? 'rotate(180deg)' : 'none' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '70px' }}>
          <path d="M0,0 C150,90 350,-40 500,45 C650,120 900,10 1200,60 L1200,120 L0,120 Z" fill={color}></path>
        </svg>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, transform: flip ? 'rotate(180deg)' : 'none' }}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '60px' }}>
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.06,130.83,121.6,200,115.8,241.6,112.3,281.7,92.8,321.39,56.44Z" fill={color}></path>
      </svg>
    </div>
  );
}
