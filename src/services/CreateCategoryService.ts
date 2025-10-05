import axios from "axios";
import { CreateCategoryDTO } from "./DTOS/finance/CreateCategoryDTO";
import { FINANCE_SERVICE_URL } from "@env";
import { CreateCategoryResponseDTO } from "./DTOS/finance/CreateCategoryResponseDTO";

export const createCategory = async (
  data: CreateCategoryDTO
): Promise<CreateCategoryResponseDTO> => {
  try {
    const { token, ...body } = data;

    let endpoint = `${FINANCE_SERVICE_URL}/categories`;

    const response = await axios.post(endpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      category: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `Erro ao criar a Categoria. Status: ${error.response?.status}`;
      return { success: false, message: errorMessage };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
