import { Transaction } from "@/graphql/__generated__/graphql";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";

export interface TransactionsResult {
  transactions: Transaction[];
}

const TRANSACTIONS_QUERY = gql`
  query Transactions {
    transactions(symbol: null) {
      id
      instrumentSymbol
      instrumentType
      type
      quantity
      price
      currency
      transactionDate
      createdAt
    }
  }
`;

export const useGetTransactions = () => {
  const [fetchTransactions, { loading, error, data }] =
    useLazyQuery<TransactionsResult>(TRANSACTIONS_QUERY);

  const executeGetTransactions = async (): Promise<Transaction[] | null> => {
    try {
      const result = await fetchTransactions();
      if (result.data) {
        return result.data.transactions;
      } else {
        return null;
      }
    } catch (err: any) {
      console.error("GraphQL Error:", JSON.stringify(err, null, 2));
      throw err;
    }
  };

  return { executeGetTransactions, loading, error, data };
};
