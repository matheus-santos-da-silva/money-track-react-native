import React, { createContext, ReactNode, useContext, useState } from "react";
import { UserTransactionsDTO } from "../services/DTOS/UserTransactionsDTO";

export interface TransactionsContextType {
  transactions: UserTransactionsDTO;
  setTransactions: (transactions: UserTransactionsDTO) => void;
  shouldRefetch: boolean;
  triggerRefetch: () => void;
  clearRefetch: () => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      "useTransactions deve ser usado dentro de TransactionsProvider"
    );
  }

  return context;
};

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<UserTransactionsDTO>({
    expenses: [],
    incomes: [],
  });

  const [shouldRefetch, setShouldRefetch] = useState(false);

  const triggerRefetch = () => setShouldRefetch(true);
  const clearRefetch = () => setShouldRefetch(false);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        shouldRefetch,
        triggerRefetch,
        clearRefetch,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
