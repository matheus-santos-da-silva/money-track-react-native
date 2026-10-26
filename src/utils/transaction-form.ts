import { monthName } from "./reports";
import { dayAndMonth } from "./plan-summary";
import { formatCurrency } from "./format-amount";
import { fromCents, toCents } from "./money";
import { CategoryDTO } from "../services/DTOS/finance/CategoryDTO";
import { TransactionDTO } from "../services/DTOS/finance/TransactionDTO";
import { shiftMonth, SHORT_MONTHS } from "./home-summary";
import { todayKey, toDateOnlyString } from "./date-only";

export const SHORTCUT_COUNT = 5;
export const MIN_INSTALLMENTS = 2;
export const MAX_INSTALLMENTS = 36;
export const MAX_AMOUNT_DIGITS = 9;
// Mesmo limite do finance-service (DESCRIPTION_MAX_LENGTH).
export const DESCRIPTION_MAX_LENGTH = 100;

export type DateOption = "today" | "yesterday" | "other";

// Mais usadas no mês primeiro; empates e categorias sem uso mantêm a ordem da API.
export const rankCategoryShortcuts = (
  categories: CategoryDTO[],
  transactions: TransactionDTO[],
  selectedId?: string
): CategoryDTO[] => {
  const usage = new Map<string, number>();
  transactions.forEach(({ category_id }) =>
    usage.set(category_id, (usage.get(category_id) ?? 0) + 1)
  );

  const ranked = categories
    .map((category, index) => ({ category, index }))
    .sort(
      (a, b) =>
        (usage.get(b.category.id) ?? 0) - (usage.get(a.category.id) ?? 0) ||
        a.index - b.index
    )
    .map(({ category }) => category);

  const shortcuts = ranked.slice(0, SHORTCUT_COUNT);
  const selected = ranked.find(({ id }) => id === selectedId);

  if (selected && !shortcuts.includes(selected)) {
    return [selected, ...shortcuts.slice(0, SHORTCUT_COUNT - 1)];
  }

  return shortcuts;
};

export const dateOption = (date: Date, now = new Date()): DateOption => {
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );
  const key = toDateOnlyString(date);

  if (key === todayKey(now)) return "today";
  if (key === toDateOnlyString(yesterday)) return "yesterday";
  return "other";
};

// "6x de R$ 20,00" e "Total R$ 120,00 · última parcela em mar/2027".
export const installmentSummary = (
  amount: number,
  installments: number,
  date: Date
) => {
  const cents = toCents(amount);
  const installmentCents = Math.round(cents / installments);
  const isExact = cents % installments === 0;
  const last = shiftMonth(
    date.getMonth(),
    date.getFullYear(),
    installments - 1
  );

  return {
    title: `${installments}x de ${isExact ? "" : "~"}${formatCurrency(
      fromCents(installmentCents)
    )}`,
    detail: `Total ${formatCurrency(amount)} · última parcela em ${
      SHORT_MONTHS[last.month]
    }/${last.year}`,
  };
};

export const recurrenceSummary = (
  date: Date,
  recurrence: "MONTHLY" | "YEARLY"
) =>
  recurrence === "MONTHLY"
    ? `Repete todo dia ${date.getDate()}, a partir de ${monthName(
        date.getMonth(),
        date.getFullYear()
      ).toLowerCase()}.`
    : `Repete todo ${dayAndMonth(date)}.`;

// O valor é digitado como uma sequência de dígitos em centavos ("12000" = R$ 120,00).
export const appendAmountDigit = (amount: number, digit: string) => {
  const cents = toCents(amount);
  if (String(cents).length >= MAX_AMOUNT_DIGITS) return amount;

  return fromCents(cents * 10 + Number(digit));
};

export const removeAmountDigit = (amount: number) =>
  fromCents(Math.floor(toCents(amount) / 10));
