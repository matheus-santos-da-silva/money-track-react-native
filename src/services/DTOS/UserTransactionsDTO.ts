import { ExpenseDTO } from "./finance/ExpenseDTO";
import { IncomeDTO } from "./finance/IncomeDTO";

export interface UserTransactionsDTO {
  expenses: ExpenseDTO[];
  incomes: IncomeDTO[];
}
