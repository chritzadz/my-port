# MyPort - Portfolio Management App 📊

MyPort is a masically a portfolio management app that helps me manage my investment intruments, monitor basic P/L and see the growth based on the asset invested. It is done by manually inputting the transactions and calculate the basic profit and loss. Yes, it is not fully done, and that most of the UI here are built with the help of LLM. I prefer spending time on the backend which is not published (for security purposes). There is required an API key to access the backend.

BUT currently the backend is only for my account :), which is useful for me, but not for everybody else. I will probably add the account management for the app, but for the time being, it will be for personalize use only.

Now, hmm the API from the backend are free :), it is limited per request per day, or even limited a certain amount for some month. But it should do the trick for now... hopefully

as per now, the GOLD api got limited already :).

## Features

### 📈 Portfolio Overview

- **Interactive Pie Chart** - Visual breakdown of your investment portfolio
- **Real-time P&L Tracking** - Monitor realized and unrealized gains/losses
- **Multi-currency Support** - Track investments in USD, IDR, HKD
- **Portfolio Summary** - Total value, transaction count, and performance metrics

### 💰 Transaction Management

- **Add Transactions** - Record buy/sell transactions with detailed information
- **Transaction History** - View complete transaction list with filtering
- **Multiple Asset Types** - Support for stocks, bonds, ETFs, and other instruments

### 🔧 Portfolio Management

- **Initial Capital Tracking** - Set and update your starting investment amount
- **Currency Selection** - Choose from available currencies or add custom ones
- **Real-time Updates** - Live portfolio updates as you add transactions

## Tech Stack

- **Frontend**: React Native with Expo
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Backend**: GraphQL API
- **State Management**: Apollo Client
- **Navigation**: Expo Router
- **Icons**: Lucide React Native
- **Charts**: React Native Pie Chart

## Project Structure

```
app/
├── (tabs)/           # Tab-based navigation
│   ├── index.tsx     # Home screen with portfolio overview
│   └── transaction-list.tsx  # Transaction management
components/
├── ui/               # Reusable UI components
│   ├── add-transaction-modal.tsx
│   ├── update-initial-capital-modal.tsx
│   ├── currency-combobox.tsx
│   ├── form-input.tsx
│   └── combobox.tsx
└── view/
    └── general-view.tsx  # Layout wrapper
hooks/
├── use-transaction.ts    # Transaction operations
├── use-currencies.ts     # Currency management
├── use-instruments.ts    # Investment instruments
└── use-total-asset.ts    # Portfolio calculations
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**
   - Set up your GraphQL endpoint in `graphql-client.ts`
   - Add your API key to the configuration

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on device**
   - Scan QR code with Expo Go app
   - Or use iOS Simulator / Android Emulator

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npx graphql-codegen` - Generate GraphQL types

## GraphQL Schema

The app connects to a GraphQL backend with the following main queries:

```graphql
query Currencies {
  currencies {
    code
  }
}

query Transactions {
  transactions {
    id
    instrumentSymbol
    type
    quantity
    price
    currency
    transactionDate
  }
}

query TotalAsset($currency: String!) {
  totalAsset(currency: $currency) {
    totalValue
    totalPnl
    transactionCount
  }
}
```

## Key Components

### Currency Combobox

Smart currency selector with:

- Searchable dropdown
- Custom currency support
- Automatic uppercase conversion
- Fallback options when API unavailable

### Form Input

Reusable form component with:

- Consistent styling
- Type-safe props
- Required field indicators
- Multiple keyboard types

### Transaction Management

Complete CRUD operations for:

- Adding new transactions
- Viewing transaction history
- Updating portfolio capital
- Currency conversion support

## Color Palette

- **Pale Green**: `#A8BBA3` - Primary accent
- **Off White**: `#F7F4EA` - Background
- **Pink White**: `#EBD9D1` - Secondary background
- **Pale Brown**: `#B87C4C` - Navigation and buttons

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both iOS and Android
5. Submit a pull request

## License

This project is for personal portfolio management and educational purposes.
