import { useState } from "react";
import { updateTransaction } from "../services/UpdateTransactionService";
import { UpdateTransactionDTO } from "../services/DTOS/finance/UpdateTransactionDTO";

export const useUpdateTransaction = () => {
  const [error, setError] = useState<string | null>(null);
  const [updateTransactionLoading, setUpdateTransactionLoading] =
    useState(false);

  const update = async (data: UpdateTransactionDTO) => {
    setUpdateTransactionLoading(true);
    setError(null);

    try {
      const res = await updateTransaction(data);

      if (res.success) {
        return res.success;
      } else {
        setError(res.message || "Erro desconhecido ao atualizar a transação.");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
      return null;
    } finally {
      setUpdateTransactionLoading(false);
    }
  };

  return {
    update,
    error,
    updateTransactionLoading,
  };
};
