import {
  latestTransactions,
  shiftMonth,
  shortDateLabel,
  spendingRatio,
} from "../src/utils/home-summary";
import { TransactionDTO } from "../src/services/DTOS/finance/TransactionDTO";

const transaction = (id: string, date: string): TransactionDTO => ({
  id,
  amount: 10,
  category_id: "category-id",
  total_installments: 1,
  current_installment: 1,
  // O servidor devolve a data como string ISO, mesmo com o DTO tipado como Date.
  transaction_date: `${date}T12:00:00.000Z` as unknown as Date,
  recurrence: "NONE",
  category: {
    id: "category-id",
    name: "Mercado",
    icon: "#4CAF50-food",
  },
});

describe("latestTransactions", () => {
  const transactions = {
    expenses: [transaction("e1", "2026-10-03"), transaction("e2", "2026-10-13")],
    incomes: [transaction("i1", "2026-10-05"), transaction("i2", "2026-10-01")],
  };

  it("should merge expenses and incomes from the newest to the oldest", () => {
    expect(latestTransactions(transactions, 4).map(({ id }) => id)).toEqual([
      "e2",
      "i1",
      "e1",
      "i2",
    ]);
  });

  it("should tag each transaction with its kind", () => {
    expect(latestTransactions(transactions, 2).map(({ kind }) => kind)).toEqual(
      ["EXPENSE", "INCOME"],
    );
  });

  it("should respect the limit", () => {
    expect(latestTransactions(transactions, 3)).toHaveLength(3);
    expect(latestTransactions({ expenses: [], incomes: [] }, 4)).toEqual([]);
  });
});

describe("spendingRatio", () => {
  it("should return the percentage of the incomes that was spent", () => {
    expect(spendingRatio(3012.4, 4850)).toEqual({
      percent: 62,
      exceeded: false,
    });
    expect(spendingRatio(0, 100)).toEqual({ percent: 0, exceeded: false });
  });

  it("should not flag spending exactly equal to the incomes as exceeded", () => {
    expect(spendingRatio(0.3, 0.1 + 0.2)).toEqual({
      percent: 100,
      exceeded: false,
    });
  });

  it("should flag spending above the incomes", () => {
    expect(spendingRatio(150, 100)).toEqual({ percent: 150, exceeded: true });
    // 100,4% arredonda para 100, mas continua acima do que recebeu.
    expect(spendingRatio(100.4, 100)).toEqual({ percent: 100, exceeded: true });
  });

  it("should return null without incomes", () => {
    expect(spendingRatio(50, 0)).toBeNull();
  });
});

describe("shiftMonth", () => {
  it("should move inside the same year", () => {
    expect(shiftMonth(9, 2026, -1)).toEqual({ month: 8, year: 2026 });
    expect(shiftMonth(9, 2026, 1)).toEqual({ month: 10, year: 2026 });
  });

  it("should roll the year over in January and December", () => {
    expect(shiftMonth(0, 2026, -1)).toEqual({ month: 11, year: 2025 });
    expect(shiftMonth(11, 2026, 1)).toEqual({ month: 0, year: 2027 });
  });
});

describe("shortDateLabel", () => {
  it("should return Hoje for today's calendar day", () => {
    expect(shortDateLabel("2026-10-13T12:00:00.000Z", "2026-10-13")).toBe(
      "Hoje",
    );
  });

  it("should return the day and the short month otherwise", () => {
    expect(shortDateLabel("2026-10-05T12:00:00.000Z", "2026-10-13")).toBe(
      "05 out",
    );
    expect(
      shortDateLabel(new Date("2026-01-31T12:00:00.000Z"), "2026-10-13"),
    ).toBe("31 jan");
  });
});
