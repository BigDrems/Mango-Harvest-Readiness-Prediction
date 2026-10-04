import { describe, it, expect } from 'vitest';
import { calculateMangoReadiness } from '../../src/fuzzy/mangoFuzzy';

describe('calculateMangoReadiness', () => {
  it('should correctly classify a Not Ready mango', () => {
    const result = calculateMangoReadiness({
      color: 17.5, // peak green
      firmness: 80, // peak hard
      daysAfterFlowering: 72.5, // peak early
    });
    expect(result.classification).toBe('Not Ready');
  });

  it('should correctly classify a Nearly Ready mango', () => {
    const result = calculateMangoReadiness({
      color: 40, // peak turning
      firmness: 80, // peak hard
      daysAfterFlowering: 90, // peak middle
    });
    expect(result.classification).toBe('Nearly Ready');
  });

  it('should correctly classify a Ready mango', () => {
    const result = calculateMangoReadiness({
      color: 65, // peak yellow
      firmness: 52.5, // peak medium
      daysAfterFlowering: 107.5, // peak late
    });
    expect(result.classification).toBe('Ready');
  });

  it('should correctly classify an Overripe mango', () => {
    const result = calculateMangoReadiness({
      color: 85, // peak orange
      firmness: 25, // peak soft
      daysAfterFlowering: 107.5, // peak late
    });
    expect(result.classification).toBe('Overripe');
  });
  
  it('should clamp out-of-bounds inputs', () => {
    const outOfBoundsResult = calculateMangoReadiness({
      color: -50,
      firmness: 150,
      daysAfterFlowering: 50,
    });
    const clampedResult = calculateMangoReadiness({
      color: 0,
      firmness: 100,
      daysAfterFlowering: 60,
    });
    // The outputs should be exactly the same due to clamping
    expect(outOfBoundsResult.score).toBe(clampedResult.score);
    expect(outOfBoundsResult.classification).toBe(clampedResult.classification);
  });
});
