import { CategoryDTO } from "./CategoryDTO";

export interface TransactionDTO {
  amount: number;
  category_id: string;
  description?: string;
  id: string;
  type?: "Receita" | "Despesa";
  total_installments: number;
  current_installment: number;
  transaction_date: Date;
  recurrence: "MONTHLY" | "YEARLY" | "NONE";
  category: CategoryDTO;
  installment_group_id?: string;
}
