import { useState } from "react";
import { deleteTransaction } from "../services/DeleteTransactionService";
import { DeleteTransactionDTO } from "../services/DTOS/finance/DeleteTransactionDTO";

export const useDeleteTransaction = () => {
  const [error, setError] = useState<string | null>(null);
  const [deleteTransactionLoading, setDeleteTransactionLoading] =
    useState(false);

  const deleteTransactionFunc = async (data: DeleteTransactionDTO ) => {
    setDeleteTransactionLoading(true);
    setError(null);

    try {
      const res = await deleteTransaction(data);

      if (res.success) {
        return res.success;
      } else {
        setError(res.message || "Erro desconhecido ao deletar a transação.");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
      return null;
    } finally {
      setDeleteTransactionLoading(false);
    }
  };

  return {
    deleteTransactionFunc,
    error,
    deleteTransactionLoading,
  };
};
