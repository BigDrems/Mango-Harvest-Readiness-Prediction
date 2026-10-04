import type { MangoInput, FuzzyResult, ReadinessTerm, RuleActivationTrace } from './types';
import { colorMembership, firmnessMembership, daysMembership, readinessMembership } from './variables';
import { rules } from './rules';

function defuzzifyCentroid(
  aggregatedFn: (y: number) => number,
  min: number = 0,
  max: number = 100,
  step: number = 0.5
): number {
  let numerator = 0;
  let denominator = 0;

  for (let y = min; y <= max; y += step) {
    const mu = aggregatedFn(y);
    numerator += y * mu;
    denominator += mu;
  }

  return denominator === 0 ? (min + max) / 2 : numerator / denominator;
}

function classifyReadiness(score: number): string {
  if (score < 30) return 'Not Ready';
  if (score < 50) return 'Nearly Ready';
  if (score < 75) return 'Ready';
  return 'Overripe';
}

export function calculateMangoReadiness(input: MangoInput): FuzzyResult {
  // Clamp inputs strictly to Universe of Discourse bounds
  const cColor = Math.max(0, Math.min(100, input.color));
  const cFirmness = Math.max(0, Math.min(100, input.firmness));
  const cDays = Math.max(60, Math.min(120, input.daysAfterFlowering));

  // 1. Fuzzification
  const fuzzifiedInputs = {
    color: {
      green: colorMembership.green(cColor),
      turning: colorMembership.turning(cColor),
      yellow: colorMembership.yellow(cColor),
      orange: colorMembership.orange(cColor),
    },
    firmness: {
      soft: firmnessMembership.soft(cFirmness),
      medium: firmnessMembership.medium(cFirmness),
      hard: firmnessMembership.hard(cFirmness),
    },
    days: {
      early: daysMembership.early(cDays),
      middle: daysMembership.middle(cDays),
      late: daysMembership.late(cDays),
    },
  };

  // 2. Rule Evaluation
  const activatedRules: RuleActivationTrace[] = [];
  const outputStrengths: Record<ReadinessTerm, number> = {
    notReady: 0,
    nearlyReady: 0,
    ready: 0,
    overripe: 0,
  };

  for (const rule of rules) {
    const strength = Math.min(
      fuzzifiedInputs.color[rule.color],
      fuzzifiedInputs.firmness[rule.firmness],
      fuzzifiedInputs.days[rule.days]
    );

    if (strength > 0) {
      activatedRules.push({ rule, firingStrength: strength });
      outputStrengths[rule.output] = Math.max(outputStrengths[rule.output], strength);
    }
  }

  // Sort activated rules descending by firing strength
  activatedRules.sort((a, b) => b.firingStrength - a.firingStrength);

  // 3. Aggregation function
  const aggregatedFn = (y: number): number => {
    return Math.max(
      Math.min(outputStrengths.notReady, readinessMembership.notReady(y)),
      Math.min(outputStrengths.nearlyReady, readinessMembership.nearlyReady(y)),
      Math.min(outputStrengths.ready, readinessMembership.ready(y)),
      Math.min(outputStrengths.overripe, readinessMembership.overripe(y))
    );
  };

  // 4. Defuzzification
  const score = defuzzifyCentroid(aggregatedFn, 0, 100, 0.5);

  return {
    score: Number(score.toFixed(2)),
    classification: classifyReadiness(score),
    activatedRules,
    fuzzifiedInputs,
  };
}
