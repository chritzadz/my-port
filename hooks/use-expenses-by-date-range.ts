import {
  DailyExpense,
  QueryExpensesByDateRangeArgs,
} from "@/graphql/__generated__/graphql";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { useCallback } from "react";

type ExpensesByDateRangeResult = {
  expensesByDateRange: DailyExpense[];
};

const EXPENSES_BY_DATE_RANGE_QUERY = gql`
  query ExpensesByDateRange($from: String!, $to: String!) {
    expensesByDateRange(from: $from, to: $to) {
      id
      item
      expense
      currency
      date
    }
  }
`;

export function useExpensesByDateRange() {
  const [fetchExpenses, { loading, error, data }] = useLazyQuery<
    ExpensesByDateRangeResult,
    QueryExpensesByDateRangeArgs
  >(EXPENSES_BY_DATE_RANGE_QUERY, {
    fetchPolicy: "network-only",
  });

  const getExpensesByDateRange = useCallback(
    async (from: string, to: string): Promise<DailyExpense[] | null> => {
      console.log("FETCH EXPENSES: from=", from, " to=", to);
      try {
        const result = await fetchExpenses({
          variables: { from, to },
        });
        console.log("RESULT:", JSON.stringify(result));
        if (result.error) {
          console.log("ERROR:", result.error.message);
        }
        if (result.data) {
          console.log("DATA:", result.data.expensesByDateRange);
          return result.data.expensesByDateRange;
        } else {
          return null;
        }
      } catch (e) {
        console.log("CATCH ERROR:", e);
        return null;
      }
    },
    [fetchExpenses],
  );

  return {
    getExpensesByDateRange,
    loading,
    error,
    expenses: data?.expensesByDateRange ?? [],
  };
}
