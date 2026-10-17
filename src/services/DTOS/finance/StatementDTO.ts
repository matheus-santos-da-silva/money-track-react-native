export type StatementType = "EXPENSE" | "INCOME";

export type StatementSort =
  | "DATE_DESC"
  | "DATE_ASC"
  | "AMOUNT_DESC"
  | "AMOUNT_ASC";

// À vista (sem parcelas nem recorrência), parcelada ou recorrente.
export type StatementMode = "SINGLE" | "INSTALLMENT" | "RECURRING";

export interface StatementItemDTO {
  id: string;
  type: StatementType;
  amount: number;
  description?: string | null;
  category_id: string;
  category: { name: string; icon: string };
  total_installments: number;
  current_installment: number;
  installment_group_id?: string | null;
  recurrence: "MONTHLY" | "YEARLY" | "NONE";
  // Dia de calendário às 12:00 UTC ("2026-10-05T12:00:00.000Z").
  transaction_date: string;
}

export interface StatementSummaryDTO {
  incomes: number;
  expenses: number;
  balance: number;
}

export interface StatementFilteredDTO {
  count: number;
  total: number;
}

export interface StatementPageDTO {
  items: StatementItemDTO[];
  next_cursor: string | null;
  // Total líquido dos dias presentes na página (vazio ao ordenar por valor).
  days: { date: string; total: number }[];
  // Só na primeira página.
  summary?: StatementSummaryDTO;
  filtered?: StatementFilteredDTO;
}

// Parâmetros de GET /transactions/statement (sem o cursor).
export interface StatementQueryDTO {
  start_date: string;
  end_date: string;
  sort: StatementSort;
  type?: StatementType;
  category_ids?: string;
  min_amount?: number;
  max_amount?: number;
  modes?: string;
  search?: string;
}
