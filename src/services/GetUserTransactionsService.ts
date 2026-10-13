import { FINANCE_SERVICE_URL } from "@env";
import axios from "axios";
import { GetUserTransactionsResponseDTO } from "./DTOS/GetUserTransactionsResponseDTO";

export const getUserTransactions = async (
  token: string,
  startDate: string,
  endDate: string
): Promise<GetUserTransactionsResponseDTO> => {
  try {
    const response = await axios.get(
      `${FINANCE_SERVICE_URL}/transactions?start_date=${startDate}&end_date=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      transactions: response.data,
    };
  } catch (error) {
    console.log(error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `Erro ao trazer as transações do usuário. Status: ${error.response?.status}`;
      return { success: false, message: errorMessage };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
