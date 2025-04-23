import { useMemo } from "react";
import { UserTransactionsDTO } from "../services/DTOS/UserTransactionsDTO";

interface BalanceResponse {
  total: number;
  expenses: number;
  incomes: number;
}

export const useBalance = (
  transactions: UserTransactionsDTO | null
): BalanceResponse => {
  return useMemo(() => {
    let total = 0;
    let expenses = 0;
    let incomes = 0;

    if (transactions?.expenses) {
      expenses = transactions.expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
      total -= expenses;
    }

    if (transactions?.incomes) {
      incomes = transactions.incomes.reduce(
        (sum, income) => sum + income.amount,
        0
      );
      total += incomes;
    }

    return {
      total,
      expenses,
      incomes,
    };
  }, [transactions]);
};
