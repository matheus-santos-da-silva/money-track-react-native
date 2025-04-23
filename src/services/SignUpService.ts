import axios from "axios";
import { USERS_SERVICE_URL } from "@env";
import { AuthResponseDTO } from "./DTOS/AuthServicesResponsesDTO";

export interface SignUpProps {
  email: string;
  name: string;
  password: string;
}

export const SignUpUser = async ({
  email,
  name,
  password,
}: SignUpProps): Promise<AuthResponseDTO> => {
  try {
    const response = await axios.post(`${USERS_SERVICE_URL}/users`, {
      email,
      name,
      password,
    });

    return {
      success: true,
      userToken: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        `Erro ao criar usuário. Status: ${error.response?.status}`;
      return { success: false, message: errorMessage };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
