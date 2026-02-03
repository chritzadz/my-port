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
  volume?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  instruments: Array<Instrument>;
  today?: Maybe<StockData>;
};


export type QueryInstrumentsArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTodayArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  symbol: Scalars['String']['input'];
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
