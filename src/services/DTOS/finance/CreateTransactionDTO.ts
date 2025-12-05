export interface CreateTransactionDTO {
  type: "expenses" | "incomes";
  token: string;
  user_id: string;
  amount: number;
  total_installments: number;
  current_installment: number;
  category_id: string;
  recurrence: "MONTHLY" | "YEARLY" | "NONE";
  description?: string;
  transaction_date: string;
}
