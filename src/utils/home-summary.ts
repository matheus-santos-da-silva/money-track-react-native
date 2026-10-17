import { toCents } from "./money";
import { dateOnlyKey, todayKey } from "./date-only";
import { TransactionDTO } from "../services/DTOS/finance/TransactionDTO";
import { UserTransactionsDTO } from "../services/DTOS/UserTransactionsDTO";

export type RecentTransaction = TransactionDTO & { kind: "EXPENSE" | "INCOME" };

export const SHORT_MONTHS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

// Despesas e receitas juntas, da mais recente para a mais antiga.
export const latestTransactions = (
  { expenses, incomes }: UserTransactionsDTO,
  limit: number,
): RecentTransaction[] =>
  [
    ...expenses.map((expense) => ({ ...expense, kind: "EXPENSE" as const })),
    ...incomes.map((income) => ({ ...income, kind: "INCOME" as const })),
  ]
    .sort((a, b) =>
      dateOnlyKey(b.transaction_date).localeCompare(
        dateOnlyKey(a.transaction_date),
      ),
    )
    .slice(0, limit);

// Quanto das receitas do mês já foi gasto. Sem receitas não há percentual.
export const spendingRatio = (
  expenses: number,
  incomes: number,
): { percent: number; exceeded: boolean } | null => {
  if (incomes <= 0) return null;

  const expenseCents = toCents(expenses);
  const incomeCents = toCents(incomes);

  return {
    percent: Math.round((expenseCents / incomeCents) * 100),
    exceeded: expenseCents > incomeCents,
  };
};

// Mês anterior (-1) ou seguinte (+1), virando o ano em janeiro/dezembro.
export const shiftMonth = (
  month: number,
  year: number,
  delta: number,
): { month: number; year: number } => {
  const shifted = new Date(year, month + delta, 1);
  return { month: shifted.getMonth(), year: shifted.getFullYear() };
};

// "Hoje" ou "05 out", a partir do dia de calendário vindo do servidor.
export const shortDateLabel = (
  value: string | Date,
  today = todayKey(),
): string => {
  const key = dateOnlyKey(value);
  if (key === today) return "Hoje";

  const [, month, day] = key.split("-");
  return `${day} ${SHORT_MONTHS[Number(month) - 1]}`;
};
