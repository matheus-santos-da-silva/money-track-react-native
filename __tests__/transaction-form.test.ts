import {
  appendAmountDigit,
  dateOption,
  installmentSummary,
  rankCategoryShortcuts,
  recurrenceSummary,
  removeAmountDigit,
} from "../src/utils/transaction-form";
import { CategoryDTO } from "../src/services/DTOS/finance/CategoryDTO";
import { TransactionDTO } from "../src/services/DTOS/finance/TransactionDTO";

const category = (id: string) =>
  ({ id, name: id, icon: "#000000-food" } as CategoryDTO);

const usedIn = (...ids: string[]) =>
  ids.map((category_id) => ({ category_id } as TransactionDTO));

describe("rankCategoryShortcuts", () => {
  const categories = ["a", "b", "c", "d", "e", "f", "g"].map(category);
  const ids = (list: CategoryDTO[]) => list.map(({ id }) => id);

  it("should keep the API order when nothing was used", () => {
    expect(ids(rankCategoryShortcuts(categories, []))).toEqual([
      "a",
      "b",
      "c",
      "d",
      "e",
    ]);
  });

  it("should put the most used first and keep the API order on ties", () => {
    const transactions = usedIn("f", "f", "c", "g", "f", "c");

    expect(ids(rankCategoryShortcuts(categories, transactions))).toEqual([
      "f",
      "c",
      "g",
      "a",
      "b",
    ]);
  });

  it("should bring the selected category to the front when it is not listed", () => {
    expect(ids(rankCategoryShortcuts(categories, [], "g"))).toEqual([
      "g",
      "a",
      "b",
      "c",
      "d",
    ]);
    expect(ids(rankCategoryShortcuts(categories, [], "c"))).toEqual([
      "a",
      "b",
      "c",
      "d",
      "e",
    ]);
  });
});

describe("dateOption", () => {
  const now = new Date(2026, 9, 1, 9, 30);

  it("should recognize today, yesterday and other days", () => {
    expect(dateOption(new Date(2026, 9, 1), now)).toBe("today");
    expect(dateOption(new Date(2026, 8, 30), now)).toBe("yesterday");
    expect(dateOption(new Date(2026, 8, 29), now)).toBe("other");
  });
});

describe("installmentSummary", () => {
  it("should split exact amounts and end on the right month", () => {
    expect(installmentSummary(120, 6, new Date(2026, 9, 16))).toEqual({
      title: "6x de R$ 20,00",
      detail: "Total R$ 120,00 · última parcela em mar/2027",
    });
  });

  it("should mark rounded installments as approximate", () => {
    expect(installmentSummary(100, 6, new Date(2026, 0, 5)).title).toBe(
      "6x de ~R$ 16,67"
    );
  });
});

describe("recurrenceSummary", () => {
  it("should describe monthly and yearly repetition", () => {
    const date = new Date(2026, 9, 16);

    expect(recurrenceSummary(date, "MONTHLY")).toBe(
      "Repete todo dia 16, a partir de outubro."
    );
    expect(recurrenceSummary(date, "YEARLY")).toBe(
      "Repete todo 16 de outubro."
    );
  });
});

describe("amount digits", () => {
  it("should type the amount in cents", () => {
    const typed = ["1", "2", "0", "0", "0"].reduce(appendAmountDigit, 0);

    expect(typed).toBe(120);
    expect(removeAmountDigit(typed)).toBe(12);
    expect(appendAmountDigit(0, "0")).toBe(0);
  });

  it("should stop at nine digits", () => {
    expect(appendAmountDigit(1234567.89, "1")).toBe(1234567.89);
  });
});
