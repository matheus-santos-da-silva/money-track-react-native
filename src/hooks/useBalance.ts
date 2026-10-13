import { useMemo } from "react";
import { subtractAmounts, sumAmounts } from "../utils/money";
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
    // Soma em centavos inteiros: somar floats acumula erro.
    const expenses = sumAmounts(
      (transactions?.expenses ?? []).map((expense) => expense.amount)
    );
    const incomes = sumAmounts(
      (transactions?.incomes ?? []).map((income) => income.amount)
    );

    return {
      total: subtractAmounts(incomes, expenses),
      expenses,
      incomes,
    };
  }, [transactions]);
};
