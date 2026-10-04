import { useState, useMemo } from 'react';
import { MangoInputForm } from './components/MangoInputForm';
import { HarvestActionCard } from './components/HarvestActionCard';
import { calculateMangoReadiness } from './fuzzy/mangoFuzzy';
import { Leaf } from 'lucide-react';

function App() {
  const [input, setInput] = useState({
    color: 30, // Turning
    firmness: 50, // Medium
    daysAfterFlowering: 90, // Middle
  });

  const result = useMemo(() => calculateMangoReadiness(input), [input]);

  return (
    <div className="container">
      <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
        <div style={{ background: 'var(--primary)', padding: '0.75rem', borderRadius: '12px', color: '#fff' }}>
          <Leaf size={32} />
        </div>
        <div>
          <h1 className="title-gradient" style={{ margin: 0, fontSize: '1.75rem' }}>Mango Harvest AI</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '600' }}>Field Assessment Tool</p>
        </div>
      </header>

      <MangoInputForm input={input} onChange={setInput} />
      
      <HarvestActionCard classification={result.classification} />
    </div>
  );
}

export default App;
