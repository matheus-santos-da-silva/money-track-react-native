import {
  canSaveCategory,
  CATEGORY_COLORS,
  categoryNameError,
  colorOptions,
  formatCategoryIcon,
  matchesCategorySearch,
  parseCategoryIcon,
} from "../src/utils/categories";

describe("category icon", () => {
  it("should split and join the color and the icon", () => {
    expect(parseCategoryIcon("#0F766E-health")).toEqual({
      color: "#0F766E",
      icon: "health",
    });
    expect(parseCategoryIcon(undefined)).toEqual({ color: "", icon: "" });
    expect(formatCategoryIcon("#0F766E", "health")).toBe("#0F766E-health");
  });
});

describe("color options", () => {
  it("should keep the palette when the color belongs to it", () => {
    expect(colorOptions("")).toBe(CATEGORY_COLORS);
    expect(colorOptions("#0f766e")).toBe(CATEGORY_COLORS);
  });

  it("should put a color outside the palette first", () => {
    const options = colorOptions("#FFA500");

    expect(options).toHaveLength(17);
    expect(options[0]).toEqual({ value: "#FFA500", label: "Cor atual" });
  });
});

describe("category form", () => {
  const form = { name: "Academia", icon: "health", color: "#0F766E" };

  it("should flag a short name only after something is typed", () => {
    expect(categoryNameError("")).toBeNull();
    expect(categoryNameError("Pe ")).toBe("Use pelo menos 3 caracteres.");
    expect(categoryNameError("Pet")).toBeNull();
  });

  it("should create only with name, icon and color", () => {
    expect(canSaveCategory(form)).toBe(true);
    expect(canSaveCategory({ ...form, name: " Pe " })).toBe(false);
    expect(canSaveCategory({ ...form, name: "x".repeat(21) })).toBe(false);
    expect(canSaveCategory({ ...form, icon: "" })).toBe(false);
    expect(canSaveCategory({ ...form, color: "" })).toBe(false);
  });

  it("should edit only when something changed", () => {
    expect(canSaveCategory(form, form)).toBe(false);
    expect(canSaveCategory({ ...form, name: "Academia " }, form)).toBe(false);
    expect(canSaveCategory({ ...form, color: "#1D4ED8" }, form)).toBe(true);
    expect(canSaveCategory({ ...form, icon: "leisure" }, form)).toBe(true);
  });
});

describe("category search", () => {
  it("should ignore accents and case on both sides", () => {
    expect(matchesCategorySearch("Saúde", "saude")).toBe(true);
    expect(matchesCategorySearch("Saúde", "SAÚ")).toBe(true);
    expect(matchesCategorySearch("Educação", "lazer")).toBe(false);
    expect(matchesCategorySearch("Lazer", "")).toBe(true);
  });
});
