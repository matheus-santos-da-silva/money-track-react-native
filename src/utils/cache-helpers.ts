import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserTransactionsDTO } from "../services/DTOS/UserTransactionsDTO";
import { StatementPageDTO } from "../services/DTOS/finance/StatementDTO";

// Quanto tempo o cache é considerado novo. Depois disso ele ainda é mostrado na hora,
// mas o app revalida com o servidor em segundo plano.
export const CACHE_TTL_MS = 60_000;

export interface TransactionsCacheEntry {
  data: UserTransactionsDTO;
  savedAt: number;
}

const cacheKey = (user_id: string, month: number, year: number) =>
  `@money-track-transactions_${user_id}_${year}_${month}`;

// Mesmo prefixo: clearOldCache também limpa o histórico dos Relatórios.
const historyCacheKey = (user_id: string, month: number, year: number) =>
  `@money-track-transactions_${user_id}_history_${year}_${month}`;

export const isCacheFresh = (
  savedAt: number,
  now = Date.now(),
  ttl = CACHE_TTL_MS
): boolean => now - savedAt < ttl;

const readTransactionsEntry = async (
  key: string
): Promise<TransactionsCacheEntry | null> => {
  try {
    const raw = await AsyncStorage.getItem(key);
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

const writeTransactionsEntry = async (
  key: string,
  data: UserTransactionsDTO
) => {
  try {
    const entry: TransactionsCacheEntry = { data, savedAt: Date.now() };
    await AsyncStorage.setItem(key, JSON.stringify(entry));
  } catch (error) {
    return null;
  }
};

export const getTransactionsCache = (
  user_id: string,
  month: number,
  year: number
) => readTransactionsEntry(cacheKey(user_id, month, year));

export const setTransactionsCache = (
  userId: string,
  month: number,
  year: number,
  data: UserTransactionsDTO
) => writeTransactionsEntry(cacheKey(userId, month, year), data);

// Histórico dos meses que terminam em `month`/`year`, numa entrada só.
export const getHistoryCache = (user_id: string, month: number, year: number) =>
  readTransactionsEntry(historyCacheKey(user_id, month, year));

export const setHistoryCache = (
  userId: string,
  month: number,
  year: number,
  data: UserTransactionsDTO
) => writeTransactionsEntry(historyCacheKey(userId, month, year), data);

interface StatementCacheKey {
  userId: string;
  // Período em AAAA-MM-DD.
  start: string;
  end: string;
}

// Mesmo prefixo do cache de transações: clearOldCache também limpa o do extrato.
const statementCacheKey = ({ userId, start, end }: StatementCacheKey) =>
  `@money-track-transactions_${userId}_statement_${start}_${end}`;

// Primeira página do extrato de um período, sem filtros.
export const getStatementCache = async (
  key: StatementCacheKey
): Promise<StatementPageDTO | null> => {
  try {
    const raw = await AsyncStorage.getItem(statementCacheKey(key));
    return raw ? (JSON.parse(raw) as StatementPageDTO) : null;
  } catch (error) {
    return null;
  }
};

export const setStatementCache = async (
  key: StatementCacheKey,
  page: StatementPageDTO
) => {
  try {
    await AsyncStorage.setItem(statementCacheKey(key), JSON.stringify(page));
  } catch (error) {
    return null;
  }
};

export const clearOldCache = async (user_id: string) => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const userKeys = allKeys.filter((key) =>
      key.startsWith(`@money-track-transactions_${user_id}_`)
    );

    if (userKeys.length > 0) await AsyncStorage.multiRemove(userKeys);
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};
