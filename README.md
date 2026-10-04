# Mango Harvest Readiness Prediction

A web application that utilizes a fuzzy logic inference system to predict the harvest readiness of mangoes. By evaluating physical characteristics like color and firmness, alongside the temporal metric of days after flowering, the application provides an accurate classification of when to harvest.

## Features

- **Fuzzy Logic Engine**: Implements a complete fuzzy inference system including fuzzification, rule evaluation, and defuzzification (centroid method) to process continuous agricultural data.
- **Multivariate Assessment**:
  - **Color**: Evaluates visual skin color progression (0-100).
  - **Firmness**: Measures fruit firmness/softness (0-100).
  - **Days After Flowering**: Accounts for the growth period (60-120 days).
- **Classification States**: Accurately categorizes mangoes into four distinct readiness states:
  - Not Ready
  - Nearly Ready
  - Ready
  - Overripe
- **Modern Tech Stack**: Built with React and Vite, featuring data visualization using Recharts and icons from Lucide.

## Mamdani Fuzzy Logic Design

This project utilizes a **Mamdani-type Fuzzy Inference System** to handle the uncertainty and continuous nature of agricultural assessments. The system operates in four distinct phases:

1. **Fuzzification**
   Crisp input values are mapped into fuzzy sets using triangular membership functions.
   - **Color** (0-100): `green`, `turning`, `yellow`, `orange`
   - **Firmness** (0-100): `soft`, `medium`, `hard`
   - **Days After Flowering** (60-120): `early`, `middle`, `late`

2. **Rule Evaluation**
   The engine processes a set of heuristic IF-THEN rules mapping input combinations to readiness outcomes. The system uses the **MIN** operator (fuzzy intersection) to evaluate the combined strength (AND operator) of each rule's conditions.

3. **Aggregation**
   Outputs from all activated rules are combined into a single fuzzy set for each outcome state using the **MAX** operator (fuzzy union), tracking the maximum firing strength for:
   - `notReady`, `nearlyReady`, `ready`, and `overripe`

4. **Defuzzification**
   The final crisp readiness score (0-100) is extracted from the aggregated fuzzy sets using the **Centroid (Center of Gravity)** method. This continuous score is then rigidly classified into the final human-readable readiness state.

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Testing**: Vitest
- **Data Visualization**: Recharts
- **Icons**: Lucide React

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

- **Start Development Server**: 
  ```bash
  npm run dev
  ```
- **Build for Production**: 
  ```bash
  npm run build
  ```
- **Run Tests**: 
  Execute the fuzzy logic test suite.
  ```bash
  npm run test
  ```
- **Lint Code**: 
  ```bash
  npm run lint
  ```
- **Preview Production Build**: 
  ```bash
  npm run preview
  ```

## Project Structure

- `src/fuzzy/`: Contains the core fuzzy logic engine (`mangoFuzzy.ts`), membership functions, defined rules, and type definitions.
- `tests/fuzzy/`: Contains the automated test suite verifying the deterministic outputs of the fuzzy inference system.
