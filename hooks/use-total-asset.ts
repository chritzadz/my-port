import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { useCallback } from "react";

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
  executeGetTotalAsset: (signal?: AbortSignal) => Promise<void>;
} {
  const [getTotalAssetQuery, { loading, error, data }] =
    useLazyQuery<TotalAssetResult>(GET_TOTAL_ASSET, {
      errorPolicy: "none",
      fetchPolicy: "cache-and-network",
    });

  const executeGetTotalAsset = useCallback(
    async (signal?: AbortSignal): Promise<void> => {
      try {
        console.log("Executing total asset query for currency:", currency);
        const result = await getTotalAssetQuery({
          variables: { currency },
          context: {
            fetchOptions: {
              signal,
            },
          },
        });
        console.log("Total asset query completed:", result);
      } catch (error: any) {
        if (error.name === "AbortError") {
          return;
        }
        console.error("Total asset query error:", error);
      }
    },
    [getTotalAssetQuery, currency],
  );

  return {
    loading,
    error,
    data,
    executeGetTotalAsset,
  };
}
