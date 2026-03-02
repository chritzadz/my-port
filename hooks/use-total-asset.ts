import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_TOTAL_ASSET = gql`
  query TotalAsset($currency: String!) {
    totalAsset(currency: $currency) {
      totalValue
      currency
      transactionCount
      totalRealizedPnl
      totalUnrealizedPnl
      totalPnl
    }
  }
`;

export type TotalAssetData = {
  totalValue: number;
  currency: string;
  transactionCount: number;
  totalRealizedPnl: number;
  totalUnrealizedPnl: number;
  totalPnl: number;
};

export type TotalAssetResult = {
  totalAsset: TotalAssetData;
};

export function useGetTotalAsset(currency: string): {
  loading: boolean;
  error: Error | undefined;
  data: TotalAssetResult | undefined;
} {
  const { loading, error, data } = useQuery<TotalAssetResult>(GET_TOTAL_ASSET, {
    variables: { currency },
    errorPolicy: "none",
    fetchPolicy: "cache-first",
    skip: !currency,
  });

  return {
    loading,
    error,
    data,
  };
}
