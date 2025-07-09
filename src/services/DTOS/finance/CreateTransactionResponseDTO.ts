import { TransactionDTO } from "./TransactionDTO";

export interface CreateTransactionResponseDTO {
  success: boolean;
  message?: string;
  transaction?: TransactionDTO;
}
