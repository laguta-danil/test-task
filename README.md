# Wallet App

A mobile wallet application built with React.js and TypeScript.

## Features

### TransactionsList Screen

- **Card Balance Block**: displays limit ($1500), current balance, and available amount
- **No Payment Due Block**: shows payment status
- **Daily Points Block**: calculates points using a special formula based on season day
- **Transaction List**: displays the latest 10 transactions with details

### TransactionDetail Screen

- Detailed information about the selected transaction
- Full date and time
- Transaction type and status
- Authorization information

## Points Calculation Logic

- 1st day of season: 2 points
- 2nd day of season: 3 points
- 3rd day and onwards: 100% of previous day + 60% of day before that
- Result is rounded
- Large numbers formatting (>1000 as "K")

## Technologies

- React.js 18
- TypeScript
- FontAwesome for icons
- CSS3 for mobile design
- JSON for test data

## Installation and Running

```bash
npm install
npm start
```

The application will open in the browser at [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── TransactionsList.tsx
│   └── TransactionDetail.tsx
├── types/              # TypeScript types
├── data/               # JSON data
├── utils/              # Utilities
│   ├── dateHelpers.ts
│   └── pointsCalculator.ts
└── styles/             # CSS styles
```

## Design

The application is optimized for mobile devices with a maximum width of 375px.
