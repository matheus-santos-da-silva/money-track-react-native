import { getDateRange } from "../utils/get-date-range";
import { UserTransactionsDTO } from "../services/DTOS/UserTransactionsDTO";
import { getUserTransactions } from "../services/GetUserTransactionsService";
import { useEffect, useState, useCallback } from "react";
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

  let startDate: string = "";
  let endDate: string = "";

  const fetchData = useCallback(
    async (forceRefresh = false): Promise<UserTransactionsDTO | null> => {
      if (!user_id || !token) return null;

      setLoading(true);
      setError(null);

      try {
        const range = getDateRange(year, month);
        startDate = range.startDate;
        endDate = range.endDate;

        if (!forceRefresh) {
          const cachedData = await getTransactionsCache(user_id, month, year);
          if (cachedData) {
            setTransactions(cachedData);
            setLoading(false);

            return cachedData;
          }
        }

        const res = await getUserTransactions(
          user_id,
          token,
          startDate,
          endDate
        );

        if (res.success && res.transactions) {
          setTransactions(res.transactions);
          setTransactionsCache(user_id, month, year, res.transactions);

          return res.transactions;
        } else {
          setError(res.message || "Erro ao buscar transações");
          if (forceRefresh) setTransactions(null);

          return null;
        }
      } catch (error) {
        setError(String(error));
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
