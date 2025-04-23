import { useEffect, useState, useCallback } from "react";
import { UserTransactionsDTO } from "../services/DTOS/UserTransactionsDTO";
import { getUserTransactions } from "../services/GetUserTransactionsService";
import { getDateRange } from "../utils/get-date-range";
import {
  getTransactionsCache,
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
    async (forceRefresh = false) => {
      if (!user_id || !token) return;

      setLoading(true);
      setError(null);

      try {
        if (!forceRefresh) {
          const cachedData = await getTransactionsCache(user_id, month, year);
          if (cachedData) {
            setTransactions(cachedData);
            setLoading(false);
            return;
          }
        }

        const { startDate, endDate } = getDateRange(year, month);
        const res = await getUserTransactions(
          user_id,
          token,
          startDate,
          endDate
        );

        if (res.success && res.transactions) {
          setTransactions(res.transactions);
          setTransactionsCache(user_id, month, year, res.transactions);
        } else {
          setError(res.message || "Erro ao buscar transações");
          if (forceRefresh) {
            setTransactions(null);
          }
        }
      } catch (error) {
        setError(String(error));
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
    refetch: () => fetchData(true),
  };
};
