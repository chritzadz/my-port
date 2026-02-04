/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddTransactionInput = {
  currency: Scalars['String']['input'];
  instrumentSymbol: Scalars['String']['input'];
  instrumentType: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  transactionDate?: InputMaybe<Scalars['String']['input']>;
  type: TransactionType;
};

export type AddTransactionResult = {
  __typename?: 'AddTransactionResult';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  transaction?: Maybe<Transaction>;
};

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['String']['output'];
};

export type Instrument = {
  __typename?: 'Instrument';
  currentPrice?: Maybe<Scalars['Float']['output']>;
  dailyChange?: Maybe<Scalars['Float']['output']>;
  dailyChangePercent?: Maybe<Scalars['Float']['output']>;
  hasCurrentData: Scalars['Boolean']['output'];
  high?: Maybe<Scalars['Float']['output']>;
  instrumentType?: Maybe<Scalars['String']['output']>;
  lastRefreshed?: Maybe<Scalars['String']['output']>;
  low?: Maybe<Scalars['Float']['output']>;
  open?: Maybe<Scalars['Float']['output']>;
  symbol: Scalars['String']['output'];
  value: Scalars['Float']['output'];
  volume?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTransaction: AddTransactionResult;
  updateInitialCapital: UpdateInitialCapitalResult;
};


export type MutationAddTransactionArgs = {
  input: AddTransactionInput;
};


export type MutationUpdateInitialCapitalArgs = {
  input: UpdateInitialCapitalInput;
};

export type Query = {
  __typename?: 'Query';
  currencies: Array<Currency>;
  instruments: Array<Instrument>;
  today?: Maybe<StockData>;
  totalAsset: TotalAsset;
  transactions: Array<Transaction>;
};


export type QueryInstrumentsArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTodayArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  symbol: Scalars['String']['input'];
};


export type QueryTotalAssetArgs = {
  currency: Scalars['String']['input'];
};


export type QueryTransactionsArgs = {
  symbol?: InputMaybe<Scalars['String']['input']>;
};

export type StockData = {
  __typename?: 'StockData';
  close: Scalars['Float']['output'];
  date: Scalars['String']['output'];
  high: Scalars['Float']['output'];
  lastRefreshed: Scalars['String']['output'];
  low: Scalars['Float']['output'];
  open: Scalars['Float']['output'];
  symbol: Scalars['String']['output'];
  volume: Scalars['Int']['output'];
};

export type TotalAsset = {
  __typename?: 'TotalAsset';
  currency: Scalars['String']['output'];
  liquidCash: Scalars['Float']['output'];
  totalPnl: Scalars['Float']['output'];
  totalRealizedPnl: Scalars['Float']['output'];
  totalUnrealizedPnl: Scalars['Float']['output'];
  totalValue: Scalars['Float']['output'];
  transactionCount: Scalars['Int']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  createdAt: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  instrumentSymbol: Scalars['String']['output'];
  instrumentType: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  quantity: Scalars['Float']['output'];
  transactionDate: Scalars['String']['output'];
  type: TransactionType;
};

export enum TransactionType {
  Buy = 'BUY',
  Sell = 'SELL'
}

export type UpdateInitialCapitalInput = {
  currency: Scalars['String']['input'];
  total: Scalars['Float']['input'];
};

export type UpdateInitialCapitalResult = {
  __typename?: 'UpdateInitialCapitalResult';
  currency?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  total?: Maybe<Scalars['Float']['output']>;
};
