import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserTransactionsDTO } from "../services/DTOS/UserTransactionsDTO";

// Quanto tempo o cache é considerado novo. Depois disso ele ainda é mostrado na hora,
// mas o app revalida com o servidor em segundo plano.
export const CACHE_TTL_MS = 60_000;

export interface TransactionsCacheEntry {
  data: UserTransactionsDTO;
  savedAt: number;
}

const cacheKey = (user_id: string, month: number, year: number) =>
  `@money-track-transactions_${user_id}_${year}_${month}`;

export const isCacheFresh = (
  savedAt: number,
  now = Date.now(),
  ttl = CACHE_TTL_MS,
): boolean => now - savedAt < ttl;

export const getTransactionsCache = async (
  user_id: string,
  month: number,
  year: number,
): Promise<TransactionsCacheEntry | null> => {
  try {
    const raw = await AsyncStorage.getItem(cacheKey(user_id, month, year));
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // Formato atual: { savedAt, data }.
    if (parsed && typeof parsed.savedAt === "number" && parsed.data) {
      return parsed as TransactionsCacheEntry;
    }

    // Formato antigo (só os dados, sem data de gravação): vale como vencido.
    return { data: parsed as UserTransactionsDTO, savedAt: 0 };
  } catch (error) {
    return null;
  }
};

export const setTransactionsCache = async (
  userId: string,
  month: number,
  year: number,
  data: UserTransactionsDTO,
) => {
  try {
    const entry: TransactionsCacheEntry = { data, savedAt: Date.now() };
    await AsyncStorage.setItem(cacheKey(userId, month, year), JSON.stringify(entry));
  } catch (error) {
    return null;
  }
};

export const clearOldCache = async (user_id: string) => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const userKeys = allKeys.filter((key) =>
      key.startsWith(`@money-track-transactions_${user_id}_`),
    );

    if (userKeys.length > 0) await AsyncStorage.multiRemove(userKeys);
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};
