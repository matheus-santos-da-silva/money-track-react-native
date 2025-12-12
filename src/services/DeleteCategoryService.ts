import axios from "axios";
import { DeleteCategoryDTO } from "./DTOS/DeleteCategoryDTO";
import { FINANCE_SERVICE_URL } from "@env";
import { CreateTransactionResponseDTO } from "./DTOS/finance/CreateTransactionResponseDTO";

export const DeleteCategory = async (
  data: DeleteCategoryDTO
): Promise<CreateTransactionResponseDTO> => {
  try {
    let endpoint = `${FINANCE_SERVICE_URL}/categories/${data.id}`;

    await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    const errorTypeMessage = "Erro ao deletar a categoria.";

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `${errorTypeMessage} Status: ${error.response?.status}`;

      return { success: false, message: errorMessage };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
