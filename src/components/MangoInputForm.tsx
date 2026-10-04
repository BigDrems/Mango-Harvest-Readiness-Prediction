import type React from 'react';
import type { MangoInput } from '../fuzzy/types';

interface MangoInputFormProps {
  input: MangoInput;
  onChange: (input: MangoInput) => void;
}

export const MangoInputForm: React.FC<MangoInputFormProps> = ({ input, onChange }) => {
  return (
    <div className="card">
      <div className="selection-group">
        <div className="selection-label">Skin Color</div>
        <div className="button-grid">
          <button 
            className={`select-btn ${input.color === 10 ? 'active' : ''}`}
            onClick={() => onChange({ ...input, color: 10 })}
          >Green</button>
          <button 
            className={`select-btn ${input.color === 30 ? 'active' : ''}`}
            onClick={() => onChange({ ...input, color: 30 })}
          >Turning</button>
          <button 
            className={`select-btn ${input.color === 65 ? 'active' : ''}`}
            onClick={() => onChange({ ...input, color: 65 })}
          >Yellow</button>
          <button 
            className={`select-btn ${input.color === 85 ? 'active' : ''}`}
            onClick={() => onChange({ ...input, color: 85 })}
          >Orange</button>
        </div>
      </div>

      <div className="selection-group">
        <div className="selection-label">Firmness</div>
        <div className="button-grid">
          <button 
            className={`select-btn ${input.firmness === 85 ? 'active' : ''}`}
            onClick={() => onChange({ ...input, firmness: 85 })}
          >Hard</button>
          <button 
            className={`select-btn ${input.firmness === 50 ? 'active' : ''}`}
            onClick={() => onChange({ ...input, firmness: 50 })}
          >Medium</button>
          <button 
            className={`select-btn ${input.firmness === 15 ? 'active' : ''}`}
            onClick={() => onChange({ ...input, firmness: 15 })}
          >Soft</button>
        </div>
      </div>

      <div className="selection-group" style={{ marginBottom: 0 }}>
        <div className="selection-label">Estimated Days (DAF)</div>
        <div className="button-grid">
          <button 
            className={`select-btn ${input.daysAfterFlowering === 65 ? 'active' : ''}`}
            onClick={() => onChange({ ...input, daysAfterFlowering: 65 })}
          >&lt; 75 days</button>
          <button 
            className={`select-btn ${input.daysAfterFlowering === 90 ? 'active' : ''}`}
            onClick={() => onChange({ ...input, daysAfterFlowering: 90 })}
          >75 - 105 days</button>
          <button 
            className={`select-btn ${input.daysAfterFlowering === 110 ? 'active' : ''}`}
            onClick={() => onChange({ ...input, daysAfterFlowering: 110 })}
          >&gt; 105 days</button>
        </div>
      </div>
    </div>
  );
};
