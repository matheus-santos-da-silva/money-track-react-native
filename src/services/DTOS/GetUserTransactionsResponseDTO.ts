import { UserTransactionsDTO } from "./UserTransactionsDTO";

export interface GetUserTransactionsResponseDTO {
  success: boolean;
  message?: string;
  transactions?: UserTransactionsDTO;
}
