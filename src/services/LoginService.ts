import axios from "axios";
import { validateData } from "../utils/validate-signUp";
import { USERS_SERVICE_URL } from "@env";
import { AuthResponseDTO } from "./AuthServicesResponsesDTO";

export const LoginUser = async (
  email: string,
  password: string
): Promise<AuthResponseDTO> => {
  const { success, message } = validateData(email, password);
  if (message) return { success, message };

  try {
    const response = await axios.post(`${USERS_SERVICE_URL}/users/signIn`, {
      email,
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
