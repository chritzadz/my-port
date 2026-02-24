import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { useCallback } from "react";

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
  executeGetToday: () => void;
} {
  const [getTodayQuery, { loading, error, data }] = useLazyQuery<TodayResult>(
    GET_TODAY,
    {
      errorPolicy: "all",
    },
  );

  const executeGetToday = useCallback((): void => {
    console.log("Executing today query for symbol:", symbol);
    getTodayQuery({ variables: { symbol, currency: "HKD" } })
      .then((result) => {
        console.log("Today query completed:", result);
      })
      .catch((error) => {
        console.error("Today query error:", error);
      });
  }, [getTodayQuery, symbol]);

  return {
    loading,
    error,
    data,
    executeGetToday,
  };
}
