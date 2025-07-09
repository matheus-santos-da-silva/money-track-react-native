import { useState } from "react";
import { TransactionDTO } from "../services/DTOS/finance/TransactionDTO";
import { createTransaction } from "../services/CreateTransactionService";
import { CreateTransactionDTO } from "../services/DTOS/finance/CreateTransactionDTO";

export const useCreateTransaction = () => {
  const [transaction, setTransaction] = useState<TransactionDTO>();
  const [error, setError] = useState<string | null>(null);
  const [transactionLoading, setTransactionLoading] = useState(false);

  const execute = async (data: CreateTransactionDTO) => {
    setTransactionLoading(true);
    setError(null);

    try {
      const res = await createTransaction(data);

      if (res.success && res.transaction) {
        setTransaction(res.transaction);
        return res.transaction;
      } else {
        setError(res.message || "Erro desconhecido ao criar a transação.");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
      return null;
    } finally {
      setTransactionLoading(false);
    }
  };

  return {
    execute,
    transaction,
    error,
    transactionLoading,
  };
};
