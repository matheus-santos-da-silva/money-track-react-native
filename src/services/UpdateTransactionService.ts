import axios from "axios";
import { FINANCE_SERVICE_URL } from "@env";
import { UpdateTransactionDTO } from "./DTOS/finance/UpdateTransactionDTO";
import { CreateTransactionResponseDTO } from "./DTOS/finance/CreateTransactionResponseDTO";

export const updateTransaction = async (
  data: UpdateTransactionDTO
): Promise<CreateTransactionResponseDTO> => {
  try {
    if (data.recurrence !== "NONE") data.total_installments = 1;
    if (data.total_installments !== 1) data.recurrence = "NONE";

    const { type, token, id, user_id, ...body } = data;

    let endpoint = `${FINANCE_SERVICE_URL}/${type}/${id}`;

    await axios.patch(endpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    const errorTypeMessage =
      data.type === "expenses"
        ? "Erro ao atualizar a despesa."
        : "Erro ao atualizar a receita.";

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `${errorTypeMessage} Status: ${error.response?.status}`;

      return { success: false, message: errorMessage };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
