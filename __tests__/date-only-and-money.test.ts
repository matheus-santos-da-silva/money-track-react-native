import { getDateRange } from "../src/utils/get-date-range";
import {
  dateOnlyKey,
  parseDateOnly,
  toDateOnlyString,
  todayKey,
} from "../src/utils/date-only";
import {
  fromCents,
  subtractAmounts,
  sumAmounts,
  toCents,
} from "../src/utils/money";

describe("date-only helpers", () => {
  it("should format the LOCAL day of a Date as YYYY-MM-DD", () => {
    expect(toDateOnlyString(new Date(2026, 9, 5, 23, 59))).toBe("2026-10-05");
    expect(toDateOnlyString(new Date(2026, 0, 1, 0, 0))).toBe("2026-01-01");
  });

  it("should read the day of a server value without timezone math", () => {
    expect(dateOnlyKey("2026-10-05T12:00:00.000Z")).toBe("2026-10-05");
    expect(dateOnlyKey(new Date("2026-10-05T12:00:00.000Z"))).toBe("2026-10-05");
  });

  it("should turn a server day into a local date at midnight of the same day", () => {
    const date = parseDateOnly("2026-10-05T12:00:00.000Z");

    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2026, 9, 5]);
    expect(date.getHours()).toBe(0);
  });

  it("should round-trip: pick a local day, send it, read it back as the same day", () => {
    const picked = new Date(2026, 2, 31, 22, 30); // 31/03 à noite
    const sent = toDateOnlyString(picked);
    const stored = `${sent}T12:00:00.000Z`; // o que o servidor devolve

    expect(sent).toBe("2026-03-31");
    expect(toDateOnlyString(parseDateOnly(stored))).toBe("2026-03-31");
  });

  it("should compute today as the local day", () => {
    expect(todayKey(new Date(2026, 5, 15, 23, 0))).toBe("2026-06-15");
  });
});

describe("getDateRange", () => {
  it("should return the first and last day of the month as local YYYY-MM-DD", () => {
    expect(getDateRange(2026, 9)).toMatchObject({
      startDate: "2026-10-01",
      endDate: "2026-10-31",
    });
  });

  it("should handle February in leap and non-leap years", () => {
    expect(getDateRange(2028, 1).endDate).toBe("2028-02-29");
    expect(getDateRange(2026, 1).endDate).toBe("2026-02-28");
  });

  it("should handle December", () => {
    expect(getDateRange(2026, 11)).toMatchObject({
      startDate: "2026-12-01",
      endDate: "2026-12-31",
    });
  });

  it("should not depend on the device time zone (no toISOString on local midnight)", () => {
    // toISOString() de meia-noite local erraria o dia em fusos a leste de UTC
    const original = process.env.TZ;
    try {
      for (const tz of ["America/Sao_Paulo", "UTC", "Europe/Lisbon", "Asia/Tokyo"]) {
        process.env.TZ = tz;
        expect(getDateRange(2026, 9)).toMatchObject({
          startDate: "2026-10-01",
          endDate: "2026-10-31",
        });
      }
    } finally {
      process.env.TZ = original;
    }
  });
});

describe("money (integer cents)", () => {
  it("should convert to and from cents without float noise", () => {
    expect(toCents(0.1)).toBe(10);
    expect(toCents(1.15)).toBe(115);
    expect(toCents(19.99)).toBe(1999);
    expect(fromCents(1999)).toBe(19.99);
  });

  it("should sum without accumulating error", () => {
    expect(0.1 + 0.2).not.toBe(0.3); // o problema de somar floats
    expect(sumAmounts([0.1, 0.2])).toBe(0.3);
    expect(sumAmounts([33.34, 33.33, 33.33])).toBe(100);
  });

  it("should sum many small values exactly", () => {
    expect(sumAmounts(Array(1000).fill(0.01))).toBe(10);
  });

  it("should handle an empty list", () => {
    expect(sumAmounts([])).toBe(0);
  });

  it("should subtract in cents", () => {
    expect(subtractAmounts(0.3, 0.1)).toBe(0.2);
    expect(subtractAmounts(100, 33.34)).toBe(66.66);
  });
});
