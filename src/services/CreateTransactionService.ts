import axios from "axios";
import { FINANCE_SERVICE_URL } from "@env";
import { CreateTransactionDTO } from "./DTOS/finance/CreateTransactionDTO";
import { CreateTransactionResponseDTO } from "./DTOS/finance/CreateTransactionResponseDTO";

export const createTransaction = async (
  data: CreateTransactionDTO
): Promise<CreateTransactionResponseDTO> => {
  try {
    if (data.recurrence !== "NONE") data.total_installments = 1;
    if (data.total_installments !== 1) data.recurrence = "NONE";

    const { type, token, ...body } = data;

    let endpoint = `${FINANCE_SERVICE_URL}/${type}`;

    const response = await axios.post(endpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      transaction: response.data,
    };
  } catch (error) {
    const errorTypeMessage =
      data.type === "expenses"
        ? "Erro ao criar a despesa."
        : "Erro ao criar a receita.";

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `${errorTypeMessage} Status: ${error.response?.status}`;
      return { success: false, message: errorMessage };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
