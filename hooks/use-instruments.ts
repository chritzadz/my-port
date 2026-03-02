import { Instrument } from "@/graphql/__generated__/graphql";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export interface InstrumentsResult {
  instruments: Instrument[];
}

const INSTRUMENTS_QUERY = gql`
  query Instruments($currency: String!) {
    instruments(currency: $currency) {
      symbol
      value
      currentPrice
      dailyChange
      dailyChangePercent
      open
      high
      low
      volume
      lastRefreshed
      hasCurrentData
      currentPosition
    }
  }
`;

export const useGetInstruments = (currency: string = "HKD") => {
  const { loading, error, data } = useQuery<InstrumentsResult>(
    INSTRUMENTS_QUERY,
    {
      variables: { currency },
      errorPolicy: "none",
      fetchPolicy: "cache-first",
    },
  );

  return {
    instruments: data?.instruments ?? [],
    loading,
    error,
  };
};
