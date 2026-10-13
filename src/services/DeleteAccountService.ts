import axios from "axios";
import { USERS_SERVICE_URL } from "@env";
import { UpdateUserResponseDTO } from "./DTOS/UpdateUserServiceResponsesDTO";

export const DeleteAccount = async (
  id: string,
  token: string,
  password: string
): Promise<UpdateUserResponseDTO> => {
  try {
    await axios.delete(`${USERS_SERVICE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { password },
    });

    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `Erro ao excluir a conta. Status: ${error.response?.status}`;
      return { success: false, message: errorMessage };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
