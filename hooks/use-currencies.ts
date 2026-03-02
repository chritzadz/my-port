import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

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
  const { loading, error, data } = useQuery<CurrenciesResult>(
    CURRENCIES_QUERY,
    {
      fetchPolicy: "cache-first",
    },
  );

  return {
    data: data?.currencies ?? [],
    loading,
    error,
  };
};
