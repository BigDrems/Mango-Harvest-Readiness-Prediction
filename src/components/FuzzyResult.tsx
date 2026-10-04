import React from 'react';

interface FuzzyResultProps {
  score: number;
  classification: string;
}

export const FuzzyResult: React.FC<FuzzyResultProps> = ({ score, classification }) => {
  const getBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'not ready': return 'status-notready';
      case 'nearly ready': return 'status-nearlyready';
      case 'ready': return 'status-ready';
      case 'overripe': return 'status-overripe';
      default: return '';
    }
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
      <h3 style={{ color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>
        Harvest Readiness Score
      </h3>
      
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <div style={{
          fontSize: '4rem', 
          fontWeight: '700', 
          lineHeight: '1',
          background: 'linear-gradient(135deg, #fff, #cbd5e1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))'
        }}>
          {score.toFixed(1)}
        </div>
        <div style={{ position: 'absolute', top: 0, right: '-20px', color: 'var(--text-muted)', fontSize: '1rem' }}>
          /100
        </div>
      </div>

      <div className={`status-badge ${getBadgeClass(classification)}`}>
        {classification}
      </div>
    </div>
  );
};
