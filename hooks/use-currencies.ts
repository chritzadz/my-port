import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";

export interface Currency {
  code: string;
}

export interface CurrenciesResult {
  currencies: Currency[];
}

const CURRENCIES_QUERY = gql`
  query Currencies {
    currencies {
      code
    }
  }
`;

export const useGetCurrencies = () => {
  const [fetchCurrencies, { loading, error, data }] =
    useLazyQuery<CurrenciesResult>(CURRENCIES_QUERY);

  const executeGetCurrencies = async (): Promise<Currency[] | null> => {
    try {
      const result = await fetchCurrencies();
      if (result.data) {
        return result.data.currencies;
      } else {
        return null;
      }
    } catch (err: any) {
      console.error("GraphQL Error:", JSON.stringify(err, null, 2));
      throw err;
    }
  };

  return { executeGetCurrencies, loading, error, data };
};
