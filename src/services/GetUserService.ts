import { USERS_SERVICE_URL } from "@env";
import axios from "axios";
import { UserServiceResponseDTO } from "./DTOS/UserServiceResponseDTO";

export const getUser = async (
  token: string
): Promise<UserServiceResponseDTO> => {
  try {
    const response = await axios.get(`${USERS_SERVICE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      user: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `Erro ao trazer os dados do usuário. Status: ${error.response?.status}`;
      return { success: false, message: errorMessage };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
