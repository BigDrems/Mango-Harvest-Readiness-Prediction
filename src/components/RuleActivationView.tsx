import React from 'react';
import type { RuleActivationTrace } from '../fuzzy/types';
import { Activity } from 'lucide-react';

interface RuleActivationViewProps {
  activatedRules: RuleActivationTrace[];
}

export const RuleActivationView: React.FC<RuleActivationViewProps> = ({ activatedRules }) => {
  return (
    <div className="glass-panel" style={{ marginTop: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Activity size={20} color="var(--primary)" />
        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Active Rule Trace</h3>
      </div>
      
      {activatedRules.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No rules activated.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {activatedRules.map((trace, idx) => (
            <div key={idx} style={{ 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid var(--border)', 
              padding: '0.75rem', 
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                IF Color is <strong style={{ color: '#fff' }}>{trace.rule.color}</strong> AND 
                Firmness is <strong style={{ color: '#fff' }}>{trace.rule.firmness}</strong> AND 
                DAF is <strong style={{ color: '#fff' }}>{trace.rule.days}</strong> 
                <span style={{ margin: '0 0.5rem', color: 'var(--primary)' }}>&rarr;</span> 
                <strong style={{ color: '#fff', textTransform: 'uppercase' }}>{trace.rule.output}</strong>
              </div>
              <div style={{ 
                background: 'rgba(245, 158, 11, 0.1)', 
                color: 'var(--primary)', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px', 
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                α = {trace.firingStrength.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
