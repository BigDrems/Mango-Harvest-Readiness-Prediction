import { triangular } from './membership';
import type { ColorTerm, FirmnessTerm, DaysTerm, ReadinessTerm } from './types';

export const colorMembership: Record<ColorTerm, (x: number) => number> = {
  green: (x) => triangular(x, 0, 17.5, 35),
  turning: (x) => triangular(x, 20, 40, 60),
  yellow: (x) => triangular(x, 45, 65, 85),
  orange: (x) => triangular(x, 70, 85, 100),
};

export const firmnessMembership: Record<FirmnessTerm, (x: number) => number> = {
  soft: (x) => triangular(x, 0, 25, 50),
  medium: (x) => triangular(x, 30, 52.5, 75),
  hard: (x) => triangular(x, 60, 80, 100),
};

export const daysMembership: Record<DaysTerm, (x: number) => number> = {
  early: (x) => triangular(x, 60, 72.5, 85),
  middle: (x) => triangular(x, 75, 90, 105),
  late: (x) => triangular(x, 95, 107.5, 120),
};

export const readinessMembership: Record<ReadinessTerm, (x: number) => number> = {
  notReady: (x) => triangular(x, 0, 15, 30),
  nearlyReady: (x) => triangular(x, 20, 35, 50),
  ready: (x) => triangular(x, 40, 57.5, 75),
  overripe: (x) => triangular(x, 65, 82.5, 100),
};
