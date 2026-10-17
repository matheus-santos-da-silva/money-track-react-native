import { formatAmount } from "./format-amount";
import { getDateRange } from "./get-date-range";
import { toDateOnlyString } from "./date-only";
import {
  StatementMode,
  StatementQueryDTO,
  StatementSort,
} from "../services/DTOS/finance/StatementDTO";

export type StatementPeriod =
  | { kind: "month"; month: number; year: number }
  | { kind: "today" | "last7" | "last30" | "thisYear" }
  // start e end em AAAA-MM-DD.
  | { kind: "custom"; start: string; end: string };

export type PeriodOption =
  | "thisMonth"
  | "today"
  | "last7"
  | "last30"
  | "lastMonth"
  | "thisYear"
  | "custom";

export type TypeFilter = "all" | "income" | "expense";

export interface StatementFilters {
  period: StatementPeriod;
  type: TypeFilter;
  categoryIds: string[];
  minAmount: number | null;
  maxAmount: number | null;
  modes: StatementMode[];
  sort: StatementSort;
}

export const DEFAULT_SORT: StatementSort = "DATE_DESC";

export const PERIOD_OPTIONS: { id: PeriodOption; label: string }[] = [
  { id: "thisMonth", label: "Este mês" },
  { id: "today", label: "Hoje" },
  { id: "last7", label: "Últimos 7 dias" },
  { id: "last30", label: "Últimos 30 dias" },
  { id: "lastMonth", label: "Mês passado" },
  { id: "thisYear", label: "Este ano" },
  { id: "custom", label: "Personalizado" },
];

export const TYPE_OPTIONS: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "Tudo" },
  { id: "income", label: "Receitas" },
  { id: "expense", label: "Despesas" },
];

export const MODE_OPTIONS: { id: StatementMode; label: string }[] = [
  { id: "SINGLE", label: "À vista" },
  { id: "INSTALLMENT", label: "Parceladas" },
  { id: "RECURRING", label: "Recorrentes" },
];

export const SORT_OPTIONS: { id: StatementSort; label: string }[] = [
  { id: "DATE_DESC", label: "Mais recentes" },
  { id: "DATE_ASC", label: "Mais antigas" },
  { id: "AMOUNT_DESC", label: "Maior valor" },
  { id: "AMOUNT_ASC", label: "Menor valor" },
];

const labelOf = <T extends string>(
  options: { id: T; label: string }[],
  id: T,
): string => options.find((option) => option.id === id)?.label ?? id;

export const monthPeriod = (month: number, year: number): StatementPeriod => ({
  kind: "month",
  month,
  year,
});

export const defaultFilters = (
  month: number,
  year: number,
): StatementFilters => ({
  period: monthPeriod(month, year),
  type: "all",
  categoryIds: [],
  minAmount: null,
  maxAmount: null,
  modes: [],
  sort: DEFAULT_SORT,
});

const daysAgo = (now: Date, days: number) =>
  new Date(now.getFullYear(), now.getMonth(), now.getDate() - days);

// Primeiro e último dia (AAAA-MM-DD) do período, no dia local do aparelho.
export const resolvePeriod = (
  period: StatementPeriod,
  now = new Date(),
): { start_date: string; end_date: string } => {
  const today = toDateOnlyString(now);

  switch (period.kind) {
    case "month": {
      const { startDate, endDate } = getDateRange(period.year, period.month);
      return { start_date: startDate, end_date: endDate };
    }
    case "today":
      return { start_date: today, end_date: today };
    case "last7":
      return { start_date: toDateOnlyString(daysAgo(now, 6)), end_date: today };
    case "last30":
      return { start_date: toDateOnlyString(daysAgo(now, 29)), end_date: today };
    case "thisYear":
      return {
        start_date: `${now.getFullYear()}-01-01`,
        end_date: `${now.getFullYear()}-12-31`,
      };
    case "custom":
      return { start_date: period.start, end_date: period.end };
  }
};

const shortDate = (dateOnly: string) => {
  const [year, month, day] = dateOnly.split("-");
  return `${day}/${month}/${year.slice(2)}`;
};

export const periodLabel = (period: StatementPeriod): string => {
  switch (period.kind) {
    case "month":
      return `${getDateRange(period.year, period.month).monthName} ${
        period.year
      }`;
    case "custom":
      return period.start === period.end
        ? shortDate(period.start)
        : `${shortDate(period.start)} – ${shortDate(period.end)}`;
    default:
      return labelOf(PERIOD_OPTIONS, period.kind);
  }
};

const previousMonth = (now: Date) => daysAgo(new Date(now.getFullYear(), now.getMonth(), 1), 1);

// Qual opção do filtro corresponde ao período; null para um mês que não é o atual nem o passado.
export const periodOptionOf = (
  period: StatementPeriod,
  now = new Date(),
): PeriodOption | null => {
  if (period.kind !== "month") return period.kind;

  const isMonthOf = (date: Date) =>
    period.month === date.getMonth() && period.year === date.getFullYear();

  if (isMonthOf(now)) return "thisMonth";
  if (isMonthOf(previousMonth(now))) return "lastMonth";
  return null;
};

export const periodFromOption = (
  option: Exclude<PeriodOption, "custom">,
  now = new Date(),
): StatementPeriod => {
  switch (option) {
    case "thisMonth":
      return monthPeriod(now.getMonth(), now.getFullYear());
    case "lastMonth": {
      const date = previousMonth(now);
      return monthPeriod(date.getMonth(), date.getFullYear());
    }
    default:
      return { kind: option };
  }
};

const TYPE_PARAM = { all: undefined, income: "INCOME", expense: "EXPENSE" } as const;

export const toStatementQuery = (
  filters: StatementFilters,
  search: string,
  now = new Date(),
): StatementQueryDTO => ({
  ...resolvePeriod(filters.period, now),
  sort: filters.sort,
  type: TYPE_PARAM[filters.type],
  category_ids: filters.categoryIds.join(",") || undefined,
  min_amount: filters.minAmount ?? undefined,
  max_amount: filters.maxAmount ?? undefined,
  modes: filters.modes.join(",") || undefined,
  search: search.trim() || undefined,
});

// Algo além do período e da ordenação está restringindo a lista?
export const isNarrowingList = (
  filters: StatementFilters,
  search: string,
): boolean =>
  filters.type !== "all" ||
  filters.categoryIds.length > 0 ||
  filters.minAmount !== null ||
  filters.maxAmount !== null ||
  filters.modes.length > 0 ||
  search.trim() !== "";

export interface FilterChip {
  key: string;
  label: string;
}

const amountLabel = (min: number | null, max: number | null): string => {
  if (min !== null && max !== null) {
    return `R$ ${formatAmount(min)} – R$ ${formatAmount(max)}`;
  }
  return min !== null
    ? `A partir de R$ ${formatAmount(min)}`
    : `Até R$ ${formatAmount(max ?? 0)}`;
};

// Etiquetas removíveis dos filtros ativos. O mês e o tipo têm controles próprios na tela.
export const activeFilterChips = (
  filters: StatementFilters,
  categoryNames: Record<string, string>,
): FilterChip[] => {
  const chips: FilterChip[] = [];
  const { period, categoryIds, minAmount, maxAmount, modes, sort } = filters;

  if (period.kind !== "month") {
    chips.push({ key: "period", label: periodLabel(period) });
  }

  if (categoryIds.length === 1) {
    chips.push({
      key: "categories",
      label: categoryNames[categoryIds[0]] ?? "1 categoria",
    });
  } else if (categoryIds.length > 1) {
    chips.push({ key: "categories", label: `${categoryIds.length} categorias` });
  }

  if (minAmount !== null || maxAmount !== null) {
    chips.push({ key: "amount", label: amountLabel(minAmount, maxAmount) });
  }

  modes.forEach((mode) =>
    chips.push({ key: `mode:${mode}`, label: labelOf(MODE_OPTIONS, mode) }),
  );

  if (sort !== DEFAULT_SORT) {
    chips.push({ key: "sort", label: labelOf(SORT_OPTIONS, sort) });
  }

  return chips;
};

export const removeFilter = (
  filters: StatementFilters,
  key: string,
  now = new Date(),
): StatementFilters => {
  if (key === "period") {
    return { ...filters, period: periodFromOption("thisMonth", now) };
  }
  if (key === "categories") return { ...filters, categoryIds: [] };
  if (key === "amount") return { ...filters, minAmount: null, maxAmount: null };
  if (key === "sort") return { ...filters, sort: DEFAULT_SORT };
  if (key.startsWith("mode:")) {
    return {
      ...filters,
      modes: filters.modes.filter((mode) => `mode:${mode}` !== key),
    };
  }
  return filters;
};
