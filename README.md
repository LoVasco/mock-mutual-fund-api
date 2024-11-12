# Mock Mutual Fund API
A simple mock API built with Express.js with a sample of mutual fund data for testing and demos. Includes endpoints for searching funds and getting detailed mutual fund information.

This API is designed to be run locally for development purposes only. It includes a randomized delay to simulate network latency.

## Installation

```bash
npm install
```

## Setup & Running

For development with hot reload:
```bash
npm run dev
```

The server runs on port 3000 by default.

## API Endpoints

### Search Funds
```
GET /api/funds/search?query={searchTerm}
```

Search for funds by name or ticker symbol. Returns matching funds sorted by relevance.

Sample response:
```json
[
    {
        "name": "Fidelity 500 Index Fund",
        "ticker": "FXAIX",
        "secid": "FOUSA00L83"
    }
]
```

### Get Fund Details
```
GET /api/funds/{ticker}
```

Retrieve detailed information about a specific fund by ticker symbol.

Sample response:
```json
{
    "name": "Fidelity 500 Index Fund",
    "ticker": "FXAIX",
    "isIndexFund": true,
    "fundSizeInUSD": 123456789,
    "managementFee": 0.015,
    "globalCategory": "US Equity Large Cap Blend",
    "numberOfHoldings": 505,
    "managementCompany": "Fidelity",
    "morningstarRating": 4,
    "investmentStrategy": "...",
    "prospectusNetExpense": 0.015,
    "globalBroadCategoryGroup": "Equity"
}
```