# Fuzzy Logic Testing Implementation

This directory contains the automated tests for the Mango Harvest Readiness Prediction fuzzy logic engine.

## Overview

The tests are written using [Vitest](https://vitest.dev/) and are designed to verify the correctness of the fuzzy inference system, which calculates a readiness score and classification based on three inputs:
- **Color** (0 - 100)
- **Firmness** (0 - 100)
- **Days After Flowering** (60 - 120)

## Test Strategy

Because fuzzy logic maps continuous inputs to continuous membership functions, testing boundary values (like exactly `0` or exactly `100`) can sometimes result in `0` membership across all sets due to the strict triangular bounds implemented in the system. When all rule firing strengths are `0`, the system defaults to returning the center of mass (a score of `50`, which classifies as "Ready"). 

To accurately verify the rule evaluations without triggering this fallback behavior, our test cases use **peak membership values**. This guarantees that a single target rule fires with a maximum strength, producing a deterministic and easily verifiable output.

### Peak Values Used in Tests:
- **Not Ready**:
  - Color: `17.5` (Peak Green)
  - Firmness: `80` (Peak Hard)
  - Days: `72.5` (Peak Early)
- **Nearly Ready**:
  - Color: `40` (Peak Turning)
  - Firmness: `80` (Peak Hard)
  - Days: `90` (Peak Middle)
- **Ready**:
  - Color: `65` (Peak Yellow)
  - Firmness: `52.5` (Peak Medium)
  - Days: `107.5` (Peak Late)
- **Overripe**:
  - Color: `85` (Peak Orange)
  - Firmness: `25` (Peak Soft)
  - Days: `107.5` (Peak Late)

## Out-of-Bounds Clamping

An additional test ensures that inputs outside the defined Universe of Discourse (e.g., negative color or days `< 60`) are strictly clamped to their nearest valid boundary by the `calculateMangoReadiness` function. We verify this by ensuring that out-of-bounds inputs produce the exact same classification and score as their explicitly clamped counterparts.

## Running the Tests

To execute the test suite, run the following command from the project root:

```bash
npm run test
```
