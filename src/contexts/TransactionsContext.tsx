import React, { createContext, ReactNode, useContext, useState } from "react";
import { UserTransactionsDTO } from "../services/DTOS/UserTransactionsDTO";

export interface TransactionsContextType {
  transactions: UserTransactionsDTO;
  setTransactions: (transactions: UserTransactionsDTO) => void;
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

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};
