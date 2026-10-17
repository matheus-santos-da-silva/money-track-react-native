import axios from "axios";
import { validateData } from "../utils/validate-signUp";
import { AUTH_REQUEST_TIMEOUT_MS, toAuthFailure } from "../utils/auth-errors";
import { AuthResponseDTO } from "./DTOS/AuthServicesResponsesDTO";
import { USERS_SERVICE_URL } from "@env";

export const LoginUser = async (
  email: string,
  password: string
): Promise<AuthResponseDTO> => {
  const { success, message } = validateData(email, password);
  if (message) return { success, message };

  try {
    const response = await axios.post(
      `${USERS_SERVICE_URL}/users/signIn`,
      {
        email,
        password,
      },
      { timeout: AUTH_REQUEST_TIMEOUT_MS }
    );

    return {
      success: true,
      userToken: response.data,
    };
  } catch (error) {
    return toAuthFailure(error);
  }
};
