import {
  DailyExpense,
  QueryExpensesByDateRangeArgs,
} from "@/graphql/__generated__/graphql";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

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

export function useExpensesByDateRange(from: string, to: string) {
  const { loading, error, data, refetch } = useQuery<
    ExpensesByDateRangeResult,
    QueryExpensesByDateRangeArgs
  >(EXPENSES_BY_DATE_RANGE_QUERY, {
    variables: { from, to },
    skip: !from || !to,
    fetchPolicy: "cache-first",
  });

  return {
    loading,
    error,
    expenses: data?.expensesByDateRange ?? [],
    refetch,
  };
}
