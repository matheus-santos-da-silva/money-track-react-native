import { CategoryDTO } from "./CategoryDTO";

export interface IncomeDTO {
  amount: number;
  category_id: string;
  description?: string;
  id: string;
  total_installments: number;
  transaction_date: Date;
  category: CategoryDTO;
}
