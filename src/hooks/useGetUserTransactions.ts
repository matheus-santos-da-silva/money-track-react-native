import { getDateRange } from "../utils/get-date-range";
import { UserTransactionsDTO } from "../services/DTOS/UserTransactionsDTO";
import { getUserTransactions } from "../services/GetUserTransactionsService";
import { useEffect, useState, useCallback } from "react";
import {
  getTransactionsCache,
  isCacheFresh,
  setTransactionsCache,
} from "../utils/cache-helpers";

interface useGetUserTransactionsDTO {
  user_id: string;
  token: string;
  month: number;
  year: number;
}

export const useGetUserTransactions = ({
  user_id,
  token,
  month,
  year,
}: useGetUserTransactionsDTO) => {
  const [transactions, setTransactions] = useState<UserTransactionsDTO | null>(
    null
  );
  const [transactionsError, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (forceRefresh = false): Promise<UserTransactionsDTO | null> => {
      if (!user_id || !token) return null;

      // Stale-while-revalidate: mostra o cache na hora (mesmo vencido, mesmo vazio) e,
      // se ele estiver velho, atualiza com o servidor em segundo plano.
      let hasCache = false;

      if (!forceRefresh) {
        const cached = await getTransactionsCache(user_id, month, year);

        if (cached) {
          hasCache = true;
          setTransactions(cached.data);
          setError(null);

          if (isCacheFresh(cached.savedAt)) return cached.data;
        }
      }

      // Com cache na tela não há spinner: a atualização acontece por baixo.
      setLoading(!hasCache);
      if (!hasCache) setError(null);

      try {
        const { startDate, endDate } = getDateRange(year, month);

        const res = await getUserTransactions(token, startDate, endDate);

        if (res.success && res.transactions) {
          setTransactions(res.transactions);
          setError(null);
          setTransactionsCache(user_id, month, year, res.transactions);

          return res.transactions;
        }

        // Sem rede: se já havia dados na tela, eles continuam (sem erro).
        if (!hasCache) setError(res.message || "Erro ao buscar transações");
        if (forceRefresh) setTransactions(null);

        return null;
      } catch (error) {
        if (!hasCache) setError(String(error));
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user_id, token, month, year]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    transactions,
    transactionsError,
    loading,
    refetch: (forceRefresh = false) => fetchData(forceRefresh),
  };
};
