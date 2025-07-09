import axios from "axios";
import { FINANCE_SERVICE_URL } from "@env";
import { GetCategoriesResponseDTO } from "./DTOS/GetCategoriesResponseDTO";

export interface GetCategoriesInput {
  token: string;
  type?: "EXPENSE" | "INCOME";
}

export const getCategories = async ({
  token,
  type,
}: GetCategoriesInput): Promise<GetCategoriesResponseDTO> => {
  try {
    let endpoint = `${FINANCE_SERVICE_URL}/categories`;
    if (type) endpoint += `?type=${type}`;

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      categories: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `Erro ao trazer os dados dos categorias. Status: ${error.response?.status}`;
      return { success: false, message: errorMessage };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
