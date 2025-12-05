export interface UpdateTransactionDTO {
  id: string;
  type?: "expenses" | "incomes";
  token: string;
  user_id: string;
  amount?: number;
  total_installments?: number;
  category_id?: string;
  recurrence?: string;
  description?: string;
  transaction_date?: string;
  applyToAll?: boolean;
  installment_group_id?: string;
}
