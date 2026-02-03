import { Instrument } from "@/graphql/__generated__/graphql";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";

export interface InstrumentsResult {
  instruments: Instrument[];
}

const INSTRUMENTS_QUERY = gql`
  query Instruments {
    instruments {
      symbol
      value
    }
  }
`;

export const useGetInstruments = () => {
  const [fetchInstruments, { loading, error, data }] =
    useLazyQuery<InstrumentsResult>(INSTRUMENTS_QUERY);

  const executeGetInstruments = async (): Promise<Instrument[] | null> => {
    try {
      const result = await fetchInstruments();
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
