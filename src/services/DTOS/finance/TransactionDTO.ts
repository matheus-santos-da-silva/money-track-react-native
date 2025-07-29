import { CategoryDTO } from "./CategoryDTO";

export interface TransactionDTO {
  amount: number;
  category_id: string;
  description?: string;
  id: string;
  total_installments: number;
  transaction_date: Date;
  recurrence: string;
  category: CategoryDTO;
}
