jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CACHE_TTL_MS,
  clearOldCache,
  getTransactionsCache,
  isCacheFresh,
  setTransactionsCache,
} from "../src/utils/cache-helpers";

const data = { expenses: [], incomes: [] } as any;

describe("transactions cache", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("should store the data together with the time it was saved", async () => {
    const before = Date.now();
    await setTransactionsCache("user-1", 9, 2026, data);

    const entry = await getTransactionsCache("user-1", 9, 2026);

    expect(entry?.data).toEqual(data);
    expect(entry!.savedAt).toBeGreaterThanOrEqual(before);
    expect(entry!.savedAt).toBeLessThanOrEqual(Date.now());
  });

  it("should return null when nothing is cached", async () => {
    expect(await getTransactionsCache("user-1", 9, 2026)).toBeNull();
  });

  it("should read the old format (raw data) as already expired", async () => {
    await AsyncStorage.setItem(
      "@money-track-transactions_user-1_2026_9",
      JSON.stringify({ expenses: [{ id: "x" }], incomes: [] })
    );

    const entry = await getTransactionsCache("user-1", 9, 2026);

    expect(entry?.data.expenses).toHaveLength(1);
    expect(entry?.savedAt).toBe(0);
    expect(isCacheFresh(entry!.savedAt)).toBe(false);
  });

  it("should return null for corrupted content instead of throwing", async () => {
    await AsyncStorage.setItem("@money-track-transactions_user-1_2026_9", "{nao-e-json");

    expect(await getTransactionsCache("user-1", 9, 2026)).toBeNull();
  });

  it("should keep each month and user separate", async () => {
    await setTransactionsCache("user-1", 9, 2026, data);

    expect(await getTransactionsCache("user-1", 8, 2026)).toBeNull();
    expect(await getTransactionsCache("user-2", 9, 2026)).toBeNull();
  });

  it("should clear only the cache of the given user", async () => {
    await setTransactionsCache("user-1", 9, 2026, data);
    await setTransactionsCache("user-1", 10, 2026, data);
    await setTransactionsCache("user-2", 9, 2026, data);

    await clearOldCache("user-1");

    expect(await getTransactionsCache("user-1", 9, 2026)).toBeNull();
    expect(await getTransactionsCache("user-1", 10, 2026)).toBeNull();
    expect(await getTransactionsCache("user-2", 9, 2026)).not.toBeNull();
  });
});

describe("isCacheFresh", () => {
  it("should be fresh before the TTL and stale after it", () => {
    const now = 1_000_000;

    expect(isCacheFresh(now - (CACHE_TTL_MS - 1), now)).toBe(true);
    expect(isCacheFresh(now - CACHE_TTL_MS, now)).toBe(false);
    expect(isCacheFresh(now - 10 * CACHE_TTL_MS, now)).toBe(false);
  });
});
