# Mango Harvest Readiness Prediction

A comprehensive web application that utilizes a **Mamdani-type Fuzzy Logic Inference System** to predict the harvest readiness of mangoes. By evaluating physical characteristics like skin color and firmness, alongside the temporal metric of days after flowering (DAF), the application provides an accurate, continuous classification of optimal harvest times.

---

## Key Features

- **Robust Fuzzy Logic Engine**: Implements a complete fuzzy inference system entirely from scratch in TypeScript, handling fuzzification, rule evaluation, aggregation, and defuzzification (centroid method).
- **Multivariate Continuous Assessment**: Evaluates crisp continuous agricultural data to make soft, intelligent decisions.
- **Explainable AI (XAI)**: The application doesn't just output a result; it visibly traces the logic. It displays all activated rules and their firing strengths, making the decision process completely transparent to the user.
- **Interactive Visualizations**: Leverages Recharts to dynamically plot fuzzy membership graphs, allowing users to visually understand how their inputs map to linguistic variables.

---

## Detailed Mamdani Fuzzy Logic Design

This project utilizes a **Mamdani-type Fuzzy Inference System** to handle the inherent uncertainty and continuous nature of agricultural assessments. The system operates in four distinct mathematical phases:

### 1. Fuzzification (Membership Functions)

Crisp input values are mapped into fuzzy sets using **Triangular Membership Functions**. A triangular fuzzy set is defined by three parameters `[a, b, c]` representing the lower bound, peak (center), and upper bound respectively.

The membership degree $\mu(x)$ is calculated mathematically as:
- $\mu(x) = 0$ if $x \le a$ or $x \ge c$
- $\mu(x) = \frac{x - a}{b - a}$ if $a < x \le b$
- $\mu(x) = \frac{c - x}{c - b}$ if $b < x < c$

**Linguistic Variables and Fuzzy Sets (`[a, b, c]`)**:

- **Color (0-100)**: Evaluates the visual progression of the skin.
  - `Green`: [0, 17.5, 35]
  - `Turning`: [20, 40, 60]
  - `Yellow`: [45, 65, 85]
  - `Orange`: [70, 85, 100]
- **Firmness (0-100)**: Measures the tactile softness of the fruit.
  - `Soft`: [0, 25, 50]
  - `Medium`: [30, 52.5, 75]
  - `Hard`: [60, 80, 100]
- **Days After Flowering (60-120)**: Accounts for the agricultural growth period.
  - `Early`: [60, 72.5, 85]
  - `Middle`: [75, 90, 105]
  - `Late`: [95, 107.5, 120]

### 2. Rule Evaluation (Inference Engine)

The engine processes a set of heuristic `IF-THEN` rules mapping combinations of fuzzy inputs to readiness outcomes. 

The system uses the **MIN operator** (fuzzy intersection / T-norm) to evaluate the combined condition strength (the `AND` operator) of each rule. 
For example:
> **IF** Color is `Turning` (0.6) **AND** Firmness is `Hard` (0.8) **AND** DAF is `Middle` (0.9)  
> **THEN** Readiness is `Nearly Ready`.  
> *Firing Strength = MIN(0.6, 0.8, 0.9) = 0.6*

### 3. Aggregation

Outputs from all activated rules are combined into a single fuzzy set for each outcome state. The system uses the **MAX operator** (fuzzy union / S-norm) to aggregate the consequences, tracking the maximum firing strength for each output term: `notReady`, `nearlyReady`, `ready`, and `overripe`.

### 4. Defuzzification (Centroid Method)

The final crisp readiness score (0-100) is extracted from the aggregated fuzzy sets using the **Center of Gravity (Centroid)** method. It calculates the center of area under the curve formed by the aggregated membership functions.

$$ \text{Score} = \frac{\sum (y \cdot \mu(y))}{\sum \mu(y)} $$

The output variable **Harvest Readiness (0-100)** defines these triangular output sets:
- **Not Ready**: [0, 15, 30]
- **Nearly Ready**: [20, 35, 50]
- **Ready**: [40, 57.5, 75]
- **Overripe**: [65, 82.5, 100]

This continuous score is then rigidly classified into a final human-readable readiness state (e.g., Score `< 30` is Not Ready).

---

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Testing Framework**: Vitest
- **Data Visualization**: Recharts (for dynamic membership charts)
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed. 

### Installation

1. Clone the repository and navigate to the project root.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Scripts

- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Run Unit Tests**: `npm run test` (Executes the fuzzy logic validation suite)
- **Lint Code**: `npm run lint`
- **Preview Production Build**: `npm run preview`

---

## Project Structure

### `src/fuzzy/` (Core Logic Engine)
- **`mangoFuzzy.ts`**: The main execution engine handling fuzzification, inference, and defuzzification.
- **`membership.ts`**: Mathematical implementation of the triangular membership function.
- **`rules.ts`**: The heuristic knowledge base (IF-THEN rule matrix).
- **`variables.ts`**: Definition of all input and output fuzzy sets.
- **`types.ts`**: Strict TypeScript interfaces for the inference system.

### `src/components/` (UI Layer)
- **`MangoInputForm.tsx`**: Collects `Color`, `Firmness`, and `DAF` inputs.
- **`MembershipChart.tsx`**: Renders visual graphs of the fuzzy logic sets using Recharts.
- **`RuleActivationView.tsx`**: Displays the active rules and their exact firing strengths to the user.
- **`FuzzyResult.tsx`**: Displays the final defuzzified score and classification.
- **`HarvestActionCard.tsx`**: Provides contextual advice based on the final readiness state.

### `tests/fuzzy/`
- Contains robust, deterministic unit tests for the engine. These tests utilize "peak values" corresponding to the exact center $b$ of the triangular sets to rigorously test expected classifications while avoiding 0-membership edge cases.
