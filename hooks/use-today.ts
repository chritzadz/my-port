import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_TODAY = gql`
  query Today($symbol: String!, $currency: String) {
    today(symbol: $symbol, currency: $currency) {
      symbol
      date
      open
      high
      low
      close
      volume
      lastRefreshed
    }
  }
`;

export type TodayData = {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  lastRefreshed: string;
};

export type TodayResult = {
  today: TodayData;
};

export function useGetToday(symbol: string): {
  loading: boolean;
  error: Error | undefined;
  data: TodayResult | undefined;
} {
  const { loading, error, data } = useQuery<TodayResult>(GET_TODAY, {
    variables: { symbol, currency: "HKD" },
    errorPolicy: "all",
    skip: !symbol, // clean way to avoid running if symbol is empty
    fetchPolicy: "cache-first",
  });

  return {
    loading,
    error,
    data,
  };
}
