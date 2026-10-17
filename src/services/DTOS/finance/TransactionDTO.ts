import { CategoryDTO } from "./CategoryDTO";

export interface TransactionDTO {
  amount: number;
  category_id: string;
  description?: string;
  id: string;
  type?: "Receita" | "Despesa";
  total_installments: number;
  current_installment: number;
  // O servidor envia o dia de calendário como string ISO ("2026-10-05T12:00:00.000Z").
  transaction_date: string | Date;
  recurrence: "MONTHLY" | "YEARLY" | "NONE";
  category: Pick<CategoryDTO, "id" | "name" | "icon">;
  installment_group_id?: string;
}
