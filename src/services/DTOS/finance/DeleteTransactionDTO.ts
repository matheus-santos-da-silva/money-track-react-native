export interface DeleteTransactionDTO {
  applyToAll: boolean;
  type: "expenses" | "incomes";
  token: string;
  user_id: string;
  id: string;
}