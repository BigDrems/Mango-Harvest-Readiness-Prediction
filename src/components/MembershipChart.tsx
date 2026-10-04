import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts';
import { readinessMembership } from '../fuzzy/variables';

interface MembershipChartProps {
  score: number;
}

export const MembershipChart: React.FC<MembershipChartProps> = ({ score }) => {
  const data = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 100; i += 2) {
      pts.push({
        x: i,
        notReady: readinessMembership.notReady(i),
        nearlyReady: readinessMembership.nearlyReady(i),
        ready: readinessMembership.ready(i),
        overripe: readinessMembership.overripe(i),
      });
    }
    return pts;
  }, []);

  return (
    <div className="glass-panel" style={{ marginTop: '1.5rem' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Output Membership Sets & Defuzzification</h3>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="x" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
              itemStyle={{ fontSize: '0.875rem' }}
              labelStyle={{ color: '#f8fafc', marginBottom: '0.5rem' }}
            />
            <Area type="monotone" dataKey="notReady" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
            <Area type="monotone" dataKey="nearlyReady" stroke="#eab308" fill="#eab308" fillOpacity={0.1} />
            <Area type="monotone" dataKey="ready" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
            <Area type="monotone" dataKey="overripe" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} />
            <ReferenceLine x={score} stroke="var(--primary)" strokeDasharray="3 3" label={{ position: 'top', value: 'Score', fill: 'var(--primary)' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
