import {
  AddTransactionInput,
  AddTransactionResult,
  Transaction,
} from "@/graphql/__generated__/graphql";
import { gql } from "@apollo/client";
import { useLazyQuery, useMutation } from "@apollo/client/react";

export interface TransactionsResult {
  transactions: Transaction[];
}

export interface UpdateInitialCapitalInput {
  total: number;
  currency: string;
}

export interface UpdateInitialCapitalResult {
  success: boolean;
  message: string;
  total: number;
  currency: string;
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

const ADD_TRANSACTION_MUTATION = gql`
  mutation AddTransaction($input: AddTransactionInput!) {
    addTransaction(input: $input) {
      success
      message
      transaction {
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
  }
`;

const UPDATE_INITIAL_CAPITAL_MUTATION = gql`
  mutation UpdateInitialCapital($input: UpdateInitialCapitalInput!) {
    updateInitialCapital(input: $input) {
      success
      message
      total
      currency
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

export const useAddTransaction = () => {
  const [addTransactionMutation, { loading, error }] = useMutation<{
    addTransaction: AddTransactionResult;
  }>(ADD_TRANSACTION_MUTATION);

  const executeAddTransaction = async (
    input: AddTransactionInput,
  ): Promise<AddTransactionResult> => {
    try {
      const result = await addTransactionMutation({
        variables: { input },
      });
      if (result.data) {
        return result.data.addTransaction;
      } else {
        throw new Error("No data returned from mutation");
      }
    } catch (err: any) {
      console.error("Add Transaction Error:", JSON.stringify(err, null, 2));
      throw err;
    }
  };

  return { executeAddTransaction, loading, error };
};

export const useUpdateInitialCapital = () => {
  const [updateInitialCapitalMutation, { loading, error }] = useMutation<{
    updateInitialCapital: UpdateInitialCapitalResult;
  }>(UPDATE_INITIAL_CAPITAL_MUTATION);

  const executeUpdateInitialCapital = async (
    input: UpdateInitialCapitalInput,
  ): Promise<UpdateInitialCapitalResult> => {
    try {
      const result = await updateInitialCapitalMutation({
        variables: { input },
      });
      if (result.data) {
        return result.data.updateInitialCapital;
      } else {
        throw new Error("No data returned from mutation");
      }
    } catch (err: any) {
      console.error(
        "Update Initial Capital Error:",
        JSON.stringify(err, null, 2),
      );
      throw err;
    }
  };

  return { executeUpdateInitialCapital, loading, error };
};
