import { getDateRange } from "./get-date-range";
import { dateOnlyKey, todayKey } from "./date-only";
import { formatAmount, formatSignedCurrency } from "./format-amount";
import { TransactionDTO } from "../services/DTOS/finance/TransactionDTO";
import {
  StatementItemDTO,
  StatementSort,
} from "../services/DTOS/finance/StatementDTO";

export interface StatementSection {
  key: string;
  // null quando a lista não é agrupada por dia (ordenação por valor).
  title: string | null;
  total: number | null;
  data: StatementItemDTO[];
}

const RECURRENCE_LABEL = { MONTHLY: "Mensal", YEARLY: "Anual" };

// "Hoje · 13 de outubro"; o ano só aparece quando não é o ano atual.
export const dayTitle = (dateOnly: string, today = todayKey()): string => {
  const [year, month, day] = dateOnly.split("-").map(Number);
  const monthName = getDateRange(year, month - 1).monthName.toLowerCase();
  const currentYear = Number(today.slice(0, 4));

  const date = `${day} de ${monthName}${
    year === currentYear ? "" : ` de ${year}`
  }`;

  return dateOnly === today ? `Hoje · ${date}` : date;
};

// Um grupo por dia, na ordem em que os itens chegaram do servidor. Ordenada por valor,
// a lista vira um grupo único sem cabeçalho.
export const groupStatement = (
  items: StatementItemDTO[],
  dayTotals: Record<string, number>,
  sort: StatementSort,
  today = todayKey(),
): StatementSection[] => {
  if (items.length === 0) return [];

  if (sort.startsWith("AMOUNT")) {
    return [{ key: "all", title: null, total: null, data: items }];
  }

  const sections: StatementSection[] = [];

  for (const item of items) {
    const day = dateOnlyKey(item.transaction_date);
    const current = sections[sections.length - 1];

    if (current?.key === day) {
      current.data.push(item);
    } else {
      sections.push({
        key: day,
        title: dayTitle(day, today),
        total: dayTotals[day] ?? null,
        data: [item],
      });
    }
  }

  return sections;
};

// Descrição, "Parcela 2/6" e "Mensal"/"Anual", só o que existir.
export const rowSubtitle = (item: StatementItemDTO): string =>
  [
    item.description,
    item.total_installments > 1 &&
      `Parcela ${item.current_installment}/${item.total_installments}`,
    item.recurrence !== "NONE" && RECURRENCE_LABEL[item.recurrence],
  ]
    .filter(Boolean)
    .join(" · ");

export const rowAccessibilityLabel = (item: StatementItemDTO): string =>
  [
    item.category.name,
    item.description,
    `${item.type === "EXPENSE" ? "despesa" : "receita"} de R$ ${formatAmount(
      item.amount,
    )}`,
  ]
    .filter(Boolean)
    .join(", ");

// Formato que o sheet de detalhe (editar/excluir) recebe.
export const toTransactionDTO = (item: StatementItemDTO): TransactionDTO => ({
  id: item.id,
  type: item.type === "EXPENSE" ? "Despesa" : "Receita",
  amount: item.amount,
  description: item.description ?? undefined,
  category_id: item.category_id,
  category: { id: item.category_id, ...item.category },
  total_installments: item.total_installments,
  current_installment: item.current_installment,
  installment_group_id: item.installment_group_id ?? undefined,
  recurrence: item.recurrence,
  transaction_date: item.transaction_date,
});

// "12 lançamentos · − R$ 540,00"
export const resultsLabel = (count: number, total: number): string =>
  `${count} ${count === 1 ? "lançamento" : "lançamentos"} · ${formatSignedCurrency(
    total,
  )}`;
