import { TransactionDTO } from "../src/services/DTOS/finance/TransactionDTO";
import {
  averageLabel,
  averageOf,
  balanceComparison,
  biggestExpense,
  biggestRiser,
  byCategory,
  chartScale,
  comparisonToAverage,
  dailyAverage,
  dailyAverageCaption,
  fixedExpenses,
  historyByMonth,
  monthHighlights,
  monthTotals,
  savingsRate,
  topCategories,
} from "../src/utils/reports";

// 14 de outubro de 2026, no dia local.
const TODAY = new Date(2026, 9, 14, 15, 30);

let nextId = 0;

const tx = (overrides: Partial<TransactionDTO> = {}): TransactionDTO => ({
  id: String(++nextId),
  amount: 100,
  category_id: "food",
  category: { id: "food", name: "Alimentação", icon: "#C2410C-food" },
  description: "",
  total_installments: 1,
  current_installment: 1,
  recurrence: "NONE",
  transaction_date: "2026-10-05T12:00:00.000Z",
  ...overrides,
});

const home = {
  category_id: "home",
  category: { id: "home", name: "Moradia", icon: "#1D4ED8-home" },
};

describe("month totals", () => {
  it("should sum in cents and compute the balance", () => {
    expect(
      monthTotals({
        incomes: [tx({ amount: 0.1 }), tx({ amount: 0.2 })],
        expenses: [tx({ amount: 0.05 })],
      })
    ).toEqual({ incomes: 0.3, expenses: 0.05, balance: 0.25 });
  });

  it("should compute the savings rate", () => {
    expect(
      savingsRate({ incomes: 4850, expenses: 3012.4, balance: 1837.6 })
    ).toBe(38);
    expect(savingsRate({ incomes: 0, expenses: 10, balance: -10 })).toBeNull();
    expect(savingsRate({ incomes: 100, expenses: 150, balance: -50 })).toBe(0);
  });
});

describe("daily average", () => {
  it("should divide by the days until today in the current month", () => {
    const average = dailyAverage(3012.4, 9, 2026, TODAY);

    expect(average).toEqual({ amount: 215.17, days: 14, isCurrentMonth: true });
    expect(dailyAverageCaption(average!, 9, 2026)).toBe(
      "nos 14 dias de outubro até hoje"
    );
  });

  it("should divide by every day of a past month", () => {
    const average = dailyAverage(3120, 8, 2026, TODAY);

    expect(average).toEqual({ amount: 104, days: 30, isCurrentMonth: false });
    expect(dailyAverageCaption(average!, 8, 2026)).toBe(
      "nos 30 dias de setembro"
    );
  });

  it("should have no average in a future month", () => {
    expect(dailyAverage(100, 10, 2026, TODAY)).toBeNull();
    expect(dailyAverage(100, 0, 2027, TODAY)).toBeNull();
  });

  it("should say the first day in the singular", () => {
    expect(
      dailyAverageCaption({ days: 1, isCurrentMonth: true }, 9, 2026)
    ).toBe("no 1º dia de outubro até hoje");
  });
});

describe("categories", () => {
  const expenses = [
    tx({ amount: 742.3 }),
    tx({ ...home, amount: 1000 }),
    tx({ ...home, amount: 400 }),
  ];

  it("should group by category, from the largest total", () => {
    const list = byCategory(expenses);

    expect(list.map(({ name, total }) => [name, total])).toEqual([
      ["Moradia", 1400],
      ["Alimentação", 742.3],
    ]);
    expect(list[0].icon).toBe("#1D4ED8-home");
    expect(list[0].share + list[1].share).toBeCloseTo(1);
  });

  it("should sum the categories beyond the limit as others", () => {
    const list = byCategory([
      ...expenses,
      tx({
        category_id: "c",
        category: { id: "c", name: "C", icon: "" },
        amount: 30,
      }),
    ]);

    expect(topCategories(list, 3)).toEqual({ top: list, others: null });

    const { top, others } = topCategories(list, 1);
    expect(top).toEqual([list[0]]);
    expect(others?.total).toBe(772.3);
    expect(others?.share).toBeCloseTo(list[1].share + list[2].share);
  });
});

describe("highlights", () => {
  it("should total the recurring and the installment expenses", () => {
    expect(
      fixedExpenses([
        tx({ amount: 1400, recurrence: "MONTHLY" }),
        tx({ amount: 139, total_installments: 3 }),
        tx({ amount: 1461 }),
      ])
    ).toEqual({ total: 1539, percent: 51 });
    expect(fixedExpenses([tx()])).toBeNull();
  });

  it("should find the category that rose the most", () => {
    const previous = [tx({ amount: 629.1 }), tx({ ...home, amount: 1400 })];

    expect(
      biggestRiser(
        [tx({ amount: 742.3 }), tx({ ...home, amount: 1400 })],
        previous
      )
    ).toEqual({ name: "Alimentação", percent: 18, difference: 113.2 });
  });

  it("should ignore small rises and new categories", () => {
    // +40%, mas só R$ 40.
    expect(
      biggestRiser([tx({ amount: 140 })], [tx({ amount: 100 })])
    ).toBeNull();
    // +R$ 60, mas só 6%.
    expect(
      biggestRiser([tx({ amount: 1060 })], [tx({ amount: 1000 })])
    ).toBeNull();
    // Sem valor anterior não há variação.
    expect(biggestRiser([tx({ ...home, amount: 900 })], [tx()])).toBeNull();
  });

  it("should pick the biggest expense, the most recent on a tie", () => {
    const older = tx({
      amount: 500,
      transaction_date: "2026-10-02T12:00:00.000Z",
    });
    const newer = tx({
      amount: 500,
      transaction_date: "2026-10-09T12:00:00.000Z",
    });

    expect(biggestExpense([older, tx({ amount: 20 }), newer])).toBe(newer);
    expect(biggestExpense([])).toBeNull();
  });

  it("should build only the highlights that apply", () => {
    const expenses = [
      tx({
        ...home,
        amount: 1400,
        description: "Aluguel",
        recurrence: "MONTHLY",
      }),
      tx({ amount: 742.3, transaction_date: "2026-10-09T12:00:00.000Z" }),
    ];

    expect(monthHighlights(expenses, null)).toEqual([
      {
        kind: "fixed",
        title: "Gastos fixos: R$ 1.400,00",
        text: "65% das saídas vêm de lançamentos recorrentes ou parcelados.",
      },
      {
        kind: "biggest",
        title: "Maior gasto: Aluguel",
        text: "R$ 1.400,00 em 5 de outubro, na categoria Moradia.",
      },
    ]);

    const withRiser = monthHighlights(expenses, {
      month: 8,
      year: 2026,
      expenses: [tx({ amount: 629.1 })],
    });
    expect(withRiser.map(({ kind }) => kind)).toEqual([
      "fixed",
      "riser",
      "biggest",
    ]);
    expect(withRiser[1]).toMatchObject({
      title: "Alimentação subiu 18%",
      text: "R$ 113,20 a mais que em setembro.",
    });

    expect(monthHighlights([], null)).toEqual([]);
  });

  it("should use the category name when the biggest expense has no description", () => {
    expect(monthHighlights([tx({ amount: 80 })], null)[0].title).toBe(
      "Maior gasto: Alimentação"
    );
  });
});

describe("history", () => {
  it("should split a long period by month, from the oldest", () => {
    const history = historyByMonth(
      {
        expenses: [
          tx({ amount: 3012.4 }),
          tx({ amount: 3120, transaction_date: "2026-09-30T12:00:00.000Z" }),
          tx({ amount: 99, transaction_date: "2026-04-30T12:00:00.000Z" }),
        ],
        incomes: [
          tx({ amount: 4500, transaction_date: "2026-09-05T12:00:00.000Z" }),
        ],
      },
      9,
      2026,
      6
    );

    expect(history.map(({ month, year }) => [month, year])).toEqual([
      [4, 2026],
      [5, 2026],
      [6, 2026],
      [7, 2026],
      [8, 2026],
      [9, 2026],
    ]);
    expect(history[4]).toEqual({
      month: 8,
      year: 2026,
      incomes: 4500,
      expenses: 3120,
      balance: 1380,
    });
    expect(history[5].expenses).toBe(3012.4);
    expect(history[0].expenses).toBe(0);
  });

  it("should cross the year", () => {
    const history = historyByMonth({ expenses: [], incomes: [] }, 1, 2027, 6);

    expect(history[0]).toMatchObject({ month: 8, year: 2026 });
  });

  it("should scale the chart to the next multiple of 500", () => {
    expect(chartScale([2640, 3380, 3012.4])).toBe(3500);
    expect(chartScale([3500])).toBe(3500);
    expect(chartScale([0, 0])).toBe(500);
  });

  it("should average only the months with spending", () => {
    expect(averageOf([0, 2000, 3000, 0])).toBe(2500);
    expect(averageOf([0, 0])).toBeNull();
    expect(averageLabel(2922.82)).toBe("média R$ 2.923");
  });

  it("should compare a month with the average", () => {
    expect(comparisonToAverage(3012.4, 2923)).toBe("3% acima da média");
    expect(comparisonToAverage(2475, 2923)).toBe("15% abaixo da média");
    expect(comparisonToAverage(2930, 2923)).toBe("na média");
    expect(comparisonToAverage(0, 2923)).toBe("sem gastos");
  });
});

describe("balance comparison", () => {
  const september = {
    month: 8,
    year: 2026,
    incomes: 4500,
    expenses: 3074.7,
    balance: 1425.3,
  };

  it("should compare with the previous month", () => {
    expect(balanceComparison(1837.6, september)).toEqual({
      tone: "up",
      label: "R$ 412,30 a mais que em setembro",
    });
    expect(balanceComparison(1305.3, september)).toEqual({
      tone: "down",
      label: "R$ 120,00 a menos que em setembro",
    });
    expect(balanceComparison(1425.3, september)).toEqual({
      tone: "same",
      label: "Mesmo saldo de setembro",
    });
  });

  it("should not compare with a month without transactions", () => {
    expect(
      balanceComparison(100, {
        ...september,
        incomes: 0,
        expenses: 0,
        balance: 0,
      })
    ).toBeNull();
    expect(balanceComparison(100, undefined)).toBeNull();
  });
});
