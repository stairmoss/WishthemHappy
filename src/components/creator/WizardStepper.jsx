import React from 'react';
import { Check } from 'lucide-react';

export function WizardStepper({ currentStep = 1, steps = [] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '32px 0 48px 0', flexWrap: 'wrap' }}>
      {steps.map((s, idx) => {
        const stepNum = idx + 1;
        const isCompleted = currentStep > stepNum;
        const isActive = currentStep === stepNum;

        return (
          <React.Fragment key={idx}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isCompleted ? 'var(--accent-secondary)' : isActive ? 'var(--accent-primary)' : 'rgba(0,0,0,0.06)',
                  color: isCompleted || isActive ? '#FFF' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  boxShadow: isActive ? '0 4px 14px rgba(217, 107, 67, 0.4)' : 'none'
                }}
              >
                {isCompleted ? <Check size={18} /> : stepNum}
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--text-headline)' : 'var(--text-muted)' }}>
                {s.title}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div style={{ width: '40px', height: '2px', background: isCompleted ? 'var(--accent-secondary)' : 'rgba(0,0,0,0.1)' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
