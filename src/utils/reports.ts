import { shiftMonth } from "./home-summary";
import { getDateRange } from "./get-date-range";
import { formatCurrency } from "./format-amount";
import { dateOnlyKey, parseDateOnly } from "./date-only";
import { TransactionDTO } from "../services/DTOS/finance/TransactionDTO";
import { UserTransactionsDTO } from "../services/DTOS/UserTransactionsDTO";
import { fromCents, subtractAmounts, sumAmounts, toCents } from "./money";

export interface MonthTotals {
  incomes: number;
  expenses: number;
  balance: number;
}

export interface MonthHistory extends MonthTotals {
  month: number;
  year: number;
}

export interface CategoryTotal {
  categoryId: string;
  name: string;
  // "<cor>-<ícone>", como em category.icon.
  icon: string;
  total: number;
  // Fração do total da lista, de 0 a 1.
  share: number;
}

export type BalanceComparison = {
  tone: "up" | "down" | "same";
  label: string;
};

export type Highlight = {
  kind: "fixed" | "riser" | "biggest";
  title: string;
  text: string;
};

// Uma categoria só é destacada quando a alta é relevante nos dois sentidos.
export const RISER_MIN_PERCENT = 10;
export const RISER_MIN_AMOUNT = 50;

// "Outubro"
export const monthName = (month: number, year: number) =>
  getDateRange(year, month).monthName;

const lowerMonthName = (month: number, year: number) =>
  monthName(month, year).toLowerCase();

const totalOf = (list: TransactionDTO[]) =>
  sumAmounts(list.map(({ amount }) => amount));

const percentOf = (part: number, whole: number) =>
  Math.round((toCents(part) / toCents(whole)) * 100);

export const monthTotals = ({
  expenses,
  incomes,
}: UserTransactionsDTO): MonthTotals => {
  const incomesTotal = totalOf(incomes);
  const expensesTotal = totalOf(expenses);

  return {
    incomes: incomesTotal,
    expenses: expensesTotal,
    balance: subtractAmounts(incomesTotal, expensesTotal),
  };
};

// Quanto do que entrou sobrou, de 0 a 100. Sem entradas não há taxa.
export const savingsRate = ({
  incomes,
  balance,
}: MonthTotals): number | null => {
  if (incomes <= 0) return null;
  if (balance <= 0) return 0;

  return Math.min(100, percentOf(balance, incomes));
};

// Gasto médio por dia: até hoje no mês corrente, o mês inteiro nos passados.
// Mês futuro não tem média.
export const dailyAverage = (
  expenses: number,
  month: number,
  year: number,
  today = new Date()
): { amount: number; days: number; isCurrentMonth: boolean } | null => {
  const shown = year * 12 + month;
  const current = today.getFullYear() * 12 + today.getMonth();

  if (shown > current) return null;

  const isCurrentMonth = shown === current;
  const days = isCurrentMonth
    ? today.getDate()
    : new Date(year, month + 1, 0).getDate();

  return {
    amount: fromCents(Math.round(toCents(expenses) / days)),
    days,
    isCurrentMonth,
  };
};

export const dailyAverageCaption = (
  { days, isCurrentMonth }: { days: number; isCurrentMonth: boolean },
  month: number,
  year: number
) => {
  const name = lowerMonthName(month, year);
  const period =
    days === 1 ? `no 1º dia de ${name}` : `nos ${days} dias de ${name}`;

  return isCurrentMonth ? `${period} até hoje` : period;
};

// Total por categoria, do maior para o menor.
export const byCategory = (list: TransactionDTO[]): CategoryTotal[] => {
  const groups = new Map<
    string,
    { name: string; icon: string; cents: number }
  >();

  for (const { category_id, category, amount } of list) {
    const group = groups.get(category_id) ?? {
      name: category?.name ?? "",
      icon: category?.icon ?? "",
      cents: 0,
    };

    group.cents += toCents(amount);
    groups.set(category_id, group);
  }

  const totalCents = [...groups.values()].reduce(
    (sum, { cents }) => sum + cents,
    0
  );

  return [...groups.entries()]
    .map(([categoryId, { name, icon, cents }]) => ({
      categoryId,
      name,
      icon,
      total: fromCents(cents),
      share: totalCents > 0 ? cents / totalCents : 0,
    }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
};

// As maiores categorias e, se sobrar, a soma das demais numa linha "Outras".
export const topCategories = (
  list: CategoryTotal[],
  limit: number
): {
  top: CategoryTotal[];
  others: { total: number; share: number } | null;
} => {
  if (list.length <= limit) return { top: list, others: null };

  const rest = list.slice(limit);

  return {
    top: list.slice(0, limit),
    others: {
      total: sumAmounts(rest.map(({ total }) => total)),
      share: rest.reduce((sum, { share }) => sum + share, 0),
    },
  };
};

const isFixed = ({ recurrence, total_installments }: TransactionDTO) =>
  recurrence !== "NONE" || total_installments > 1;

// Despesas recorrentes ou parceladas: o que já está comprometido no mês.
export const fixedExpenses = (
  expenses: TransactionDTO[]
): { total: number; percent: number } | null => {
  const fixed = expenses.filter(isFixed);
  if (fixed.length === 0) return null;

  const total = totalOf(fixed);

  return { total, percent: percentOf(total, totalOf(expenses)) };
};

// A categoria de despesa com a maior alta em reais sobre o mês anterior, desde que
// suba pelo menos RISER_MIN_PERCENT e RISER_MIN_AMOUNT. Categoria nova não conta: sem
// valor anterior não há variação.
export const biggestRiser = (
  current: TransactionDTO[],
  previous: TransactionDTO[]
): { name: string; percent: number; difference: number } | null => {
  const before = new Map(
    byCategory(previous).map(({ categoryId, total }) => [categoryId, total])
  );

  let riser: { name: string; percent: number; difference: number } | null =
    null;

  for (const { categoryId, name, total } of byCategory(current)) {
    const previousTotal = before.get(categoryId);
    if (!previousTotal) continue;

    const difference = subtractAmounts(total, previousTotal);
    const percent = percentOf(difference, previousTotal);

    if (
      difference >= RISER_MIN_AMOUNT &&
      percent >= RISER_MIN_PERCENT &&
      difference > (riser?.difference ?? 0)
    ) {
      riser = { name, percent, difference };
    }
  }

  return riser;
};

// A maior despesa; no empate, a mais recente.
export const biggestExpense = (
  expenses: TransactionDTO[]
): TransactionDTO | null =>
  expenses.reduce<TransactionDTO | null>((biggest, expense) => {
    if (!biggest) return expense;

    const diff = toCents(expense.amount) - toCents(biggest.amount);
    if (diff !== 0) return diff > 0 ? expense : biggest;

    return dateOnlyKey(expense.transaction_date) >
      dateOnlyKey(biggest.transaction_date)
      ? expense
      : biggest;
  }, null);

// Lançamentos de um mês dentro de um período maior.
export const transactionsOfMonth = (
  { expenses, incomes }: UserTransactionsDTO,
  month: number,
  year: number
): UserTransactionsDTO => {
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const inMonth = ({ transaction_date }: TransactionDTO) =>
    dateOnlyKey(transaction_date).startsWith(prefix);

  return {
    expenses: expenses.filter(inMonth),
    incomes: incomes.filter(inMonth),
  };
};

// Totais dos `months` meses que terminam no mês informado, do mais antigo ao mais novo.
export const historyByMonth = (
  tx: UserTransactionsDTO,
  month: number,
  year: number,
  months: number
): MonthHistory[] =>
  Array.from({ length: months }, (_, index) => {
    const shifted = shiftMonth(month, year, index - (months - 1));

    return {
      ...shifted,
      ...monthTotals(transactionsOfMonth(tx, shifted.month, shifted.year)),
    };
  });

// Topo do gráfico: o maior valor arredondado para cima ao próximo múltiplo de 500.
export const chartScale = (values: number[]) =>
  Math.max(500, Math.ceil(Math.max(0, ...values) / 500) * 500);

// Média só dos meses com gasto: mês sem lançamento não puxa a média para baixo.
export const averageOf = (values: number[]): number | null => {
  const withValue = values.filter((value) => value > 0);
  if (withValue.length === 0) return null;

  return fromCents(
    Math.round(toCents(sumAmounts(withValue)) / withValue.length)
  );
};

// "média R$ 2.923": no gráfico, sem centavos.
export const averageLabel = (average: number) =>
  `média R$ ${Math.round(average).toLocaleString("pt-BR")}`;

export const comparisonToAverage = (value: number, average: number | null) => {
  if (value <= 0 || average === null) return "sem gastos";

  const diff = Math.round(((value - average) / average) * 100);
  if (diff === 0) return "na média";

  return `${Math.abs(diff)}% ${diff > 0 ? "acima" : "abaixo"} da média`;
};

// Saldo do mês contra o do mês anterior; sem lançamentos no anterior não há comparação.
export const balanceComparison = (
  balance: number,
  previous: MonthHistory | undefined
): BalanceComparison | null => {
  if (!previous || (previous.incomes === 0 && previous.expenses === 0)) {
    return null;
  }

  const name = lowerMonthName(previous.month, previous.year);
  const diff = subtractAmounts(balance, previous.balance);

  if (diff === 0) return { tone: "same", label: `Mesmo saldo de ${name}` };

  return {
    tone: diff > 0 ? "up" : "down",
    label: `${formatCurrency(Math.abs(diff))} a ${
      diff > 0 ? "mais" : "menos"
    } que em ${name}`,
  };
};

// Destaques do mês, só os que se aplicam. `previous` é null enquanto o histórico não
// chega: a alta de categoria espera por ele.
export const monthHighlights = (
  expenses: TransactionDTO[],
  previous: { expenses: TransactionDTO[]; month: number; year: number } | null
): Highlight[] => {
  const highlights: Highlight[] = [];

  const fixed = fixedExpenses(expenses);
  if (fixed) {
    highlights.push({
      kind: "fixed",
      title: `Gastos fixos: ${formatCurrency(fixed.total)}`,
      text: `${fixed.percent}% das saídas vêm de lançamentos recorrentes ou parcelados.`,
    });
  }

  const riser =
    previous && previous.expenses.length > 0
      ? biggestRiser(expenses, previous.expenses)
      : null;
  if (riser && previous) {
    highlights.push({
      kind: "riser",
      title: `${riser.name} subiu ${riser.percent}%`,
      text: `${formatCurrency(riser.difference)} a mais que em ${lowerMonthName(
        previous.month,
        previous.year
      )}.`,
    });
  }

  const biggest = biggestExpense(expenses);
  if (biggest) {
    const date = parseDateOnly(biggest.transaction_date);

    highlights.push({
      kind: "biggest",
      title: `Maior gasto: ${biggest.description || biggest.category.name}`,
      text: `${formatCurrency(
        biggest.amount
      )} em ${date.getDate()} de ${lowerMonthName(
        date.getMonth(),
        date.getFullYear()
      )}, na categoria ${biggest.category.name}.`,
    });
  }

  return highlights;
};
