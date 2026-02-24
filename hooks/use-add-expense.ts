import {
  AddExpenseInput,
  AddExpenseResult,
} from "@/graphql/__generated__/graphql";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const ADD_EXPENSE_MUTATION = gql`
  mutation AddExpense(
    $item: String!
    $expense: Float!
    $currency: String!
    $date: String!
  ) {
    addExpense(
      item: $item
      expense: $expense
      currency: $currency
      date: $date
    ) {
      success
      expense {
        id
        item
        expense
        currency
        date
      }
      message
    }
  }
`;

export function useAddExpense() {
  const [addExpenseMutation, { loading, error, data }] = useMutation<
    { addExpense: AddExpenseResult },
    { item: string; expense: number; currency: string; date: string }
  >(ADD_EXPENSE_MUTATION);

  const addExpense = async (
    input: AddExpenseInput,
  ): Promise<AddExpenseResult | null> => {
    console.log("addExpense input:", input);
    try {
      const result = await addExpenseMutation({
        variables: {
          item: input.item,
          expense: input.expense,
          currency: input.currency,
          date: input.date,
        },
      });
      console.log("addExpense result:", result);
      if (result.data) {
        return result.data.addExpense;
      } else {
        return null;
      }
    } catch (err: any) {
      console.log("addExpense error:", err);
      // Apollo error is already available in error
      return null;
    }
  };

  return { addExpense, loading, error, result: data?.addExpense ?? null };
}
