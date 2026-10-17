import axios from "axios";
import { USERS_SERVICE_URL } from "@env";
import { AUTH_REQUEST_TIMEOUT_MS, toAuthFailure } from "../utils/auth-errors";
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
    const response = await axios.post(
      `${USERS_SERVICE_URL}/users`,
      {
        email,
        name,
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
