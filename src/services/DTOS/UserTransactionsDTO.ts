import { TransactionDTO } from "./finance/TransactionDTO";

export interface UserTransactionsDTO {
  expenses: TransactionDTO[];
  incomes: TransactionDTO[];
}
