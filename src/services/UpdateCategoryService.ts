import axios from "axios";
import { UpdateCategoryDTO } from "./DTOS/finance/UpdateCategoryDTO";
import { FINANCE_SERVICE_URL } from "@env";
import { CreateCategoryResponseDTO } from "./DTOS/finance/CreateCategoryResponseDTO";

export const updateCategory = async (
  data: UpdateCategoryDTO
): Promise<CreateCategoryResponseDTO> => {
  try {
    const { token, category_id, ...body } = data;

    let endpoint = `${FINANCE_SERVICE_URL}/categories/${category_id}`;

    await axios.patch(endpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `Erro ao atualizar a Categoria. Status: ${error.response?.status}`;

      return { success: false, message: errorMessage };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
