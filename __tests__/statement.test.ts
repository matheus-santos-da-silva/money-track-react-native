import { StatementItemDTO } from "../src/services/DTOS/finance/StatementDTO";
import {
  activeFilterChips,
  defaultFilters,
  isNarrowingList,
  periodFromOption,
  periodLabel,
  periodOptionOf,
  removeFilter,
  resolvePeriod,
  toStatementQuery,
} from "../src/utils/statement-filters";
import {
  dayTitle,
  groupStatement,
  resultsLabel,
  rowAccessibilityLabel,
  rowSubtitle,
  toTransactionDTO,
} from "../src/utils/statement-list";

// 13 de outubro de 2026, no dia local.
const NOW = new Date(2026, 9, 13, 15, 30);
const TODAY = "2026-10-13";

const item = (overrides: Partial<StatementItemDTO> = {}): StatementItemDTO => ({
  id: "e1",
  type: "EXPENSE",
  amount: 236.9,
  description: "Mercado",
  category_id: "category-id",
  category: { name: "Alimentação", icon: "#E67171-food" },
  total_installments: 1,
  current_installment: 1,
  installment_group_id: null,
  recurrence: "NONE",
  transaction_date: "2026-10-13T12:00:00.000Z",
  ...overrides,
});

describe("resolvePeriod", () => {
  it("should return the first and the last day of a month", () => {
    expect(resolvePeriod({ kind: "month", month: 1, year: 2028 }, NOW)).toEqual({
      start_date: "2028-02-01",
      end_date: "2028-02-29",
    });
  });

  it("should resolve the relative periods from the local day", () => {
    expect(resolvePeriod({ kind: "today" }, NOW)).toEqual({
      start_date: TODAY,
      end_date: TODAY,
    });
    expect(resolvePeriod({ kind: "last7" }, NOW)).toEqual({
      start_date: "2026-10-07",
      end_date: TODAY,
    });
    expect(resolvePeriod({ kind: "last30" }, NOW)).toEqual({
      start_date: "2026-09-14",
      end_date: TODAY,
    });
    expect(resolvePeriod({ kind: "thisYear" }, NOW)).toEqual({
      start_date: "2026-01-01",
      end_date: "2026-12-31",
    });
  });

  it("should keep a custom period as it is", () => {
    expect(
      resolvePeriod({ kind: "custom", start: "2026-08-10", end: "2026-09-02" }),
    ).toEqual({ start_date: "2026-08-10", end_date: "2026-09-02" });
  });
});

describe("period options", () => {
  it("should label each kind of period", () => {
    expect(periodLabel({ kind: "month", month: 9, year: 2026 })).toBe(
      "Outubro 2026",
    );
    expect(periodLabel({ kind: "last30" })).toBe("Últimos 30 dias");
    expect(
      periodLabel({ kind: "custom", start: "2026-08-10", end: "2026-09-02" }),
    ).toBe("10/08/26 – 02/09/26");
    expect(
      periodLabel({ kind: "custom", start: "2026-08-10", end: "2026-08-10" }),
    ).toBe("10/08/26");
  });

  it("should recognise this month and last month, even across the year", () => {
    const january = new Date(2026, 0, 15);

    expect(periodOptionOf({ kind: "month", month: 9, year: 2026 }, NOW)).toBe(
      "thisMonth",
    );
    expect(periodOptionOf({ kind: "month", month: 8, year: 2026 }, NOW)).toBe(
      "lastMonth",
    );
    expect(
      periodOptionOf({ kind: "month", month: 11, year: 2025 }, january),
    ).toBe("lastMonth");
    expect(
      periodOptionOf({ kind: "month", month: 2, year: 2026 }, NOW),
    ).toBeNull();
    expect(periodOptionOf({ kind: "last7" }, NOW)).toBe("last7");
  });

  it("should build the period of an option", () => {
    expect(periodFromOption("thisMonth", NOW)).toEqual({
      kind: "month",
      month: 9,
      year: 2026,
    });
    expect(periodFromOption("lastMonth", new Date(2026, 0, 15))).toEqual({
      kind: "month",
      month: 11,
      year: 2025,
    });
    expect(periodFromOption("thisYear", NOW)).toEqual({ kind: "thisYear" });
  });
});

describe("toStatementQuery", () => {
  it("should send only the period and the sort order by default", () => {
    expect(toStatementQuery(defaultFilters(9, 2026), "", NOW)).toEqual({
      start_date: "2026-10-01",
      end_date: "2026-10-31",
      sort: "DATE_DESC",
    });
  });

  it("should send every active filter", () => {
    const query = toStatementQuery(
      {
        period: { kind: "last7" },
        type: "expense",
        categoryIds: ["a", "b"],
        minAmount: 10.5,
        maxAmount: null,
        modes: ["INSTALLMENT", "RECURRING"],
        sort: "AMOUNT_DESC",
      },
      "  mercado ",
      NOW,
    );

    expect(query).toEqual({
      start_date: "2026-10-07",
      end_date: TODAY,
      sort: "AMOUNT_DESC",
      type: "EXPENSE",
      category_ids: "a,b",
      min_amount: 10.5,
      modes: "INSTALLMENT,RECURRING",
      search: "mercado",
    });
  });
});

describe("active filters", () => {
  const filters = {
    ...defaultFilters(9, 2026),
    period: { kind: "today" as const },
    categoryIds: ["a"],
    minAmount: 100,
    maxAmount: 250,
    modes: ["RECURRING" as const],
    sort: "AMOUNT_DESC" as const,
  };

  it("should have no chips for the default month view", () => {
    expect(activeFilterChips(defaultFilters(9, 2026), {})).toEqual([]);
  });

  it("should describe each active filter", () => {
    expect(activeFilterChips(filters, { a: "Alimentação" })).toEqual([
      { key: "period", label: "Hoje" },
      { key: "categories", label: "Alimentação" },
      { key: "amount", label: "R$ 100,00 – R$ 250,00" },
      { key: "mode:RECURRING", label: "Recorrentes" },
      { key: "sort", label: "Maior valor" },
    ]);
  });

  it("should summarise several categories and open amount ranges", () => {
    const labels = (changes: object) =>
      activeFilterChips({ ...defaultFilters(9, 2026), ...changes }, {}).map(
        ({ label }) => label,
      );

    expect(labels({ categoryIds: ["a", "b", "c"] })).toEqual(["3 categorias"]);
    expect(labels({ minAmount: 50 })).toEqual(["A partir de R$ 50,00"]);
    expect(labels({ maxAmount: 80 })).toEqual(["Até R$ 80,00"]);
  });

  it("should remove one filter at a time", () => {
    expect(removeFilter(filters, "period", NOW).period).toEqual({
      kind: "month",
      month: 9,
      year: 2026,
    });
    expect(removeFilter(filters, "categories").categoryIds).toEqual([]);
    expect(removeFilter(filters, "amount")).toMatchObject({
      minAmount: null,
      maxAmount: null,
    });
    expect(removeFilter(filters, "mode:RECURRING").modes).toEqual([]);
    expect(removeFilter(filters, "sort").sort).toBe("DATE_DESC");
  });

  it("should tell when the list is narrowed beyond the period and the sort order", () => {
    const base = defaultFilters(9, 2026);

    expect(isNarrowingList(base, "")).toBe(false);
    expect(isNarrowingList({ ...base, sort: "AMOUNT_ASC" }, " ")).toBe(false);
    expect(isNarrowingList({ ...base, period: { kind: "today" } }, "")).toBe(
      false,
    );
    expect(isNarrowingList({ ...base, type: "income" }, "")).toBe(true);
    expect(isNarrowingList(base, "uber")).toBe(true);
    expect(isNarrowingList({ ...base, maxAmount: 10 }, "")).toBe(true);
  });
});

describe("statement list", () => {
  it("should title a day, marking today and other years", () => {
    expect(dayTitle("2026-10-13", TODAY)).toBe("Hoje · 13 de outubro");
    expect(dayTitle("2026-10-05", TODAY)).toBe("5 de outubro");
    expect(dayTitle("2025-12-31", TODAY)).toBe("31 de dezembro de 2025");
  });

  it("should group consecutive items by day with the day total", () => {
    const sections = groupStatement(
      [
        item({ id: "e1" }),
        item({ id: "i1", type: "INCOME" }),
        item({ id: "e2", transaction_date: "2026-10-10T12:00:00.000Z" }),
      ],
      { "2026-10-13": -136.9 },
      "DATE_DESC",
      TODAY,
    );

    expect(sections).toEqual([
      expect.objectContaining({
        key: "2026-10-13",
        title: "Hoje · 13 de outubro",
        total: -136.9,
      }),
      expect.objectContaining({
        key: "2026-10-10",
        title: "10 de outubro",
        total: null,
      }),
    ]);
    expect(sections[0].data.map(({ id }) => id)).toEqual(["e1", "i1"]);
  });

  it("should return a single group without a header when sorting by amount", () => {
    const sections = groupStatement(
      [item({ id: "e1" }), item({ id: "e2" })],
      {},
      "AMOUNT_DESC",
      TODAY,
    );

    expect(sections).toHaveLength(1);
    expect(sections[0]).toMatchObject({ title: null, total: null });
    expect(groupStatement([], {}, "AMOUNT_DESC", TODAY)).toEqual([]);
  });

  it("should build the second line of a row only from what exists", () => {
    expect(rowSubtitle(item())).toBe("Mercado");
    expect(rowSubtitle(item({ description: null }))).toBe("");
    expect(
      rowSubtitle(
        item({
          description: "Tênis",
          total_installments: 6,
          current_installment: 2,
        }),
      ),
    ).toBe("Tênis · Parcela 2/6");
    expect(rowSubtitle(item({ description: "", recurrence: "MONTHLY" }))).toBe(
      "Mensal",
    );
  });

  it("should describe a row for screen readers", () => {
    expect(rowAccessibilityLabel(item())).toBe(
      "Alimentação, Mercado, despesa de R$ 236,90",
    );
    expect(
      rowAccessibilityLabel(
        item({ type: "INCOME", description: null, amount: 4500 }),
      ),
    ).toBe("Alimentação, receita de R$ 4.500,00");
  });

  it("should label the filtered results", () => {
    expect(resultsLabel(1, -236.9)).toBe("1 lançamento · − R$ 236,90");
    expect(resultsLabel(12, 3100)).toBe("12 lançamentos · + R$ 3.100,00");
  });

  it("should convert an item to the shape of the detail sheet", () => {
    expect(toTransactionDTO(item({ type: "INCOME" }))).toMatchObject({
      id: "e1",
      type: "Receita",
      category_id: "category-id",
      category: { id: "category-id", name: "Alimentação" },
      transaction_date: "2026-10-13T12:00:00.000Z",
    });
  });
});
