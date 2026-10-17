import { shiftMonth } from "../utils/home-summary";
import { getDateRange } from "../utils/get-date-range";
import { UserTransactionsDTO } from "../services/DTOS/UserTransactionsDTO";
import { getUserTransactions } from "../services/GetUserTransactionsService";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getHistoryCache,
  isCacheFresh,
  setHistoryCache,
} from "../utils/cache-helpers";

interface UseTransactionsHistoryParams {
  user_id: string;
  token: string;
  month: number;
  year: number;
  // Quantos meses, contando o informado.
  months: number;
}

// Lançamentos dos `months` meses que terminam no mês informado, numa requisição só.
// A separação por mês fica com quem usa (historyByMonth / transactionsOfMonth).
export const useTransactionsHistory = ({
  user_id,
  token,
  month,
  year,
  months,
}: UseTransactionsHistoryParams) => {
  // Os dados guardam o mês a que pertencem: logo após trocar de mês, antes da nova
  // busca começar, o histórico do mês anterior não chega à tela.
  const key = `${year}-${month}`;
  const [entry, setEntry] = useState<{
    key: string;
    data: UserTransactionsDTO;
  } | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Trocar de mês rápido dispara várias buscas: só a última pode atualizar a tela.
  const requestId = useRef(0);

  const fetchData = useCallback(
    async (forceRefresh = false) => {
      if (!user_id || !token) return;

      const id = ++requestId.current;
      const isCurrent = () => id === requestId.current;

      // Stale-while-revalidate, como em useGetUserTransactions.
      let hasCache = false;

      if (!forceRefresh) {
        const cached = await getHistoryCache(user_id, month, year);
        if (!isCurrent()) return;

        if (cached) {
          hasCache = true;
          setEntry({ key, data: cached.data });
          setErrorKey(null);

          if (isCacheFresh(cached.savedAt)) return;
        }
      }

      if (!hasCache) setErrorKey(null);
      setLoading(!hasCache);

      const first = shiftMonth(month, year, -(months - 1));
      const { startDate } = getDateRange(first.year, first.month);
      const { endDate } = getDateRange(year, month);

      try {
        const res = await getUserTransactions(token, startDate, endDate);
        if (!isCurrent()) return;

        if (res.success && res.transactions) {
          setEntry({ key, data: res.transactions });
          setErrorKey(null);
          setHistoryCache(user_id, month, year, res.transactions);
        } else if (!hasCache) {
          setErrorKey(key);
        }
      } catch {
        if (isCurrent() && !hasCache) setErrorKey(key);
      } finally {
        if (isCurrent()) setLoading(false);
      }
    },
    [user_id, token, month, year, months, key]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    transactions: entry?.key === key ? entry.data : null,
    loading,
    error: errorKey === key,
    refetch: fetchData,
  };
};
