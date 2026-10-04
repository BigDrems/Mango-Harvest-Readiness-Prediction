export interface MangoInput {
  color: number;              // Range: 0 to 100
  firmness: number;           // Range: 0 to 100
  daysAfterFlowering: number; // Range: 60 to 120
}

export type ColorTerm = 'green' | 'turning' | 'yellow' | 'orange';
export type FirmnessTerm = 'soft' | 'medium' | 'hard';
export type DaysTerm = 'early' | 'middle' | 'late';
export type ReadinessTerm = 'notReady' | 'nearlyReady' | 'ready' | 'overripe';

export interface FuzzyRule {
  color: ColorTerm;
  firmness: FirmnessTerm;
  days: DaysTerm;
  output: ReadinessTerm;
}

export interface RuleActivationTrace {
  rule: FuzzyRule;
  firingStrength: number;
}

export interface FuzzyResult {
  score: number;
  classification: string;
  activatedRules: RuleActivationTrace[];
  fuzzifiedInputs: {
    color: Record<ColorTerm, number>;
    firmness: Record<FirmnessTerm, number>;
    days: Record<DaysTerm, number>;
  };
}
