import axios from "axios";
import { FINANCE_SERVICE_URL } from "@env";
import {
  StatementPageDTO,
  StatementQueryDTO,
} from "./DTOS/finance/StatementDTO";

export const STATEMENT_PAGE_SIZE = 30;

interface GetStatementResponse {
  success: boolean;
  message?: string;
  page?: StatementPageDTO;
}

export const getStatement = async (
  token: string,
  query: StatementQueryDTO,
  cursor?: string,
): Promise<GetStatementResponse> => {
  try {
    const response = await axios.get<StatementPageDTO>(
      `${FINANCE_SERVICE_URL}/transactions/statement`,
      {
        params: { ...query, limit: STATEMENT_PAGE_SIZE, cursor },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { success: true, page: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `Erro ao trazer o extrato. Status: ${error.response?.status}`;
      return { success: false, message: errorMessage };
    }
    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
