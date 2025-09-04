import axios from "axios";
import { USERS_SERVICE_URL } from "@env";
import { UpdateUserResponseDTO } from "./DTOS/UpdateUserServiceResponsesDTO";

export const UpdateUser = async (
  id: string,
  token: string,
  email?: string,
  name?: string
): Promise<UpdateUserResponseDTO> => {
  try {
    await axios.patch(
      `${USERS_SERVICE_URL}/users/${id}`,
      {
        email,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `Erro ao atualizar o usuário. Status: ${error.response?.status}`;
      return { success: false, message: errorMessage };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
