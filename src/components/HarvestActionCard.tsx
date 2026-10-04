import type React from 'react';
import { AlertTriangle, CheckCircle, Clock, Trash2 } from 'lucide-react';

interface HarvestActionCardProps {
  classification: string;
}

export const HarvestActionCard: React.FC<HarvestActionCardProps> = ({ classification }) => {
  const normalizedStatus = classification.replace(/\s+/g, '').toLowerCase();

  const getContent = () => {
    switch (normalizedStatus) {
      case 'notready':
        return {
          title: 'DO NOT HARVEST',
          advice: 'Wait at least 2-3 weeks. The fruit is too immature and will not ripen properly off the tree.',
          icon: <Clock size={48} className="status-notready" />,
          cssClass: 'notready'
        };
      case 'nearlyready':
        return {
          title: 'HARVEST SOON',
          advice: 'Check again in 3-5 days. Good for long-distance transport, but not peak flavor yet.',
          icon: <AlertTriangle size={48} className="status-nearlyready" />,
          cssClass: 'nearlyready'
        };
      case 'ready':
        return {
          title: 'READY TO HARVEST',
          advice: 'Pick immediately! Optimal balance of firmness for handling and sugar for flavor.',
          icon: <CheckCircle size={48} className="status-ready" />,
          cssClass: 'ready'
        };
      case 'overripe':
        return {
          title: 'OVERRIPE',
          advice: 'Too soft for transport. May be bruised or fermented. Local consumption only.',
          icon: <Trash2 size={48} className="status-overripe" />,
          cssClass: 'overripe'
        };
      default:
        return {
          title: 'UNKNOWN',
          advice: 'Please select inputs to assess harvest readiness.',
          icon: null,
          cssClass: ''
        };
    }
  };

  const { title, advice, icon, cssClass } = getContent();

  return (
    <div className={`advice-card ${cssClass}`}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
        {icon}
      </div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' }} className={`status-${cssClass}`}>
        {title}
      </h2>
      <p style={{ fontSize: '1.1rem', fontWeight: '500', maxWidth: '400px', margin: '0 auto', color: 'var(--text-main)' }}>
        {advice}
      </p>
    </div>
  );
};
