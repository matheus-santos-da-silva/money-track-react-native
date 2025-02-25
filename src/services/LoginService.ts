import axios from "axios";
import { validateEmail, validatePassword } from "../utils/validate-signUp";
import { USERS_SERVICE_URL } from "@env";
import { AuthResponseDTO } from "./AuthServicesResponsesDTO";

export const LoginUser = async (
  email: string,
  password: string
): Promise<AuthResponseDTO> => {
  const validEmail = validateEmail(email);
  if (validEmail.message) {
    return { success: false, message: validEmail.message };
  }

  const validPassword = validatePassword(password);
  if (validPassword.message) {
    return { success: false, message: validPassword.message };
  }

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
