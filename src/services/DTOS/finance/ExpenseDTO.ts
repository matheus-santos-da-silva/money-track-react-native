export interface ExpenseDTO {
  amount: number;
  category_id: string;
  description?: string;
  id: string;
  total_installments: number;
}
