export interface DeleteTransactionDTO {
  applyToAll: boolean;
  type: "expenses" | "incomes";
  token: string;
  id: string;
}