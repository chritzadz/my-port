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
      currentPosition
    }
  }
`;

export const useGetInstruments = () => {
  const [fetchInstruments, { loading, error, data }] =
    useLazyQuery<InstrumentsResult>(INSTRUMENTS_QUERY, {
      errorPolicy: "none", // Don't show errors in UI
      fetchPolicy: "cache-and-network",
    });

  const executeGetInstruments = async (
    signal?: AbortSignal,
  ): Promise<Instrument[] | null> => {
    try {
      const result = await fetchInstruments({
        variables: { currency: "HKD" },
        context: {
          fetchOptions: {
            signal, // Pass AbortSignal for cancellation
          },
        },
      });
      if (result.data) {
        return result.data.instruments;
      } else {
        return null;
      }
    } catch (err: any) {
      // Silently ignore AbortError
      if (err.name === "AbortError") {
        return null;
      }
      console.error("GraphQL Error:", JSON.stringify(err, null, 2));
      throw err;
    }
  };

  return { executeGetInstruments, loading, error, data };
};
