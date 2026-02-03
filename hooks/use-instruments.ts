import { Instrument } from "@/graphql/__generated__/graphql";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";

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
    }
  }
`;

export const useGetInstruments = () => {
  const [fetchInstruments, { loading, error, data }] =
    useLazyQuery<InstrumentsResult>(INSTRUMENTS_QUERY);

  const executeGetInstruments = async (): Promise<Instrument[] | null> => {
    try {
      const result = await fetchInstruments({
        variables: { currency: "HKD" },
      });
      if (result.data) {
        return result.data.instruments;
      } else {
        return null;
      }
    } catch (err: any) {
      console.error("GraphQL Error:", JSON.stringify(err, null, 2));
      throw err;
    }
  };

  return { executeGetInstruments, loading, error, data };
};
