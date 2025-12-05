import axios from "axios";
import { FINANCE_SERVICE_URL } from "@env";
import { DeleteTransactionDTO } from "./DTOS/finance/DeleteTransactionDTO";
import { CreateTransactionResponseDTO } from "./DTOS/finance/CreateTransactionResponseDTO";

export const deleteTransaction = async (
  data: DeleteTransactionDTO
): Promise<CreateTransactionResponseDTO> => {
  try {
    const { type, token, id, applyToAll } = data;

    let endpoint = `${FINANCE_SERVICE_URL}/${type}/${id}?applyToAll=${applyToAll}`;

    await axios.delete(endpoint, {
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
        ? "Erro ao deletar a despesa."
        : "Erro ao deletar a receita.";

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `${errorTypeMessage} Status: ${error.response?.status}`;

      return { success: false, message: errorMessage };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
