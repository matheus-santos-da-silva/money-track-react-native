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
  allMonths: boolean;
}

export const useGetUserTransactions = ({
  user_id,
  token,
  month,
  year,
  allMonths = false,
}: useGetUserTransactionsDTO) => {
  const [transactions, setTransactions] = useState<UserTransactionsDTO | null>(
    null
  );
  const [transactionsError, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  let startDate: string = "";
  let endDate: string = "";

  const fetchData = useCallback(
    async (forceRefresh = false) => {
      if (!user_id || !token) return;

      setLoading(true);
      setError(null);

      try {
        if (allMonths) {
          startDate = `${year}-01-01`;
          endDate = `${year}-12-31`;
        } else {
          const range = getDateRange(year, month);
          startDate = range.startDate;
          endDate = range.endDate;
        }

        if (!forceRefresh && !allMonths) {
          const cachedData = await getTransactionsCache(user_id, month, year);
          if (cachedData) {
            setTransactions(cachedData);
            setLoading(false);
            return;
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
          if (!allMonths) {
            setTransactionsCache(user_id, month, year, res.transactions);
          }
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
    [user_id, token, month, year, allMonths]
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
