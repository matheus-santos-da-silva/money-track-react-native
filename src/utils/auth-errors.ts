import axios from "axios";
import { AuthResponseDTO } from "../services/DTOS/AuthServicesResponsesDTO";

export type AuthFailure = Pick<AuthResponseDTO, "message" | "status">;

export const INVALID_CREDENTIALS_MESSAGE =
  "E-mail ou senha incorretos. Confira os dados e tente de novo.";
export const NETWORK_ERROR_MESSAGE =
  "Não foi possível conectar. Verifique sua internet e tente de novo.";

export const AUTH_REQUEST_TIMEOUT_MS = 15000;

// Sem resposta do servidor (rede, timeout) a falha volta sem status nem mensagem.
export const toAuthFailure = (error: unknown): AuthResponseDTO => {
  if (axios.isAxiosError(error) && error.response) {
    const { status, data } = error.response;
    return {
      success: false,
      status,
      message: data?.message || `Erro inesperado (status ${status}).`,
    };
  }

  return { success: false };
};

export const authErrorMessage = ({ status, message }: AuthFailure) => {
  if (status === 401) return INVALID_CREDENTIALS_MESSAGE;
  if (status === undefined && !message) return NETWORK_ERROR_MESSAGE;
  return message ?? NETWORK_ERROR_MESSAGE;
};

export const isEmailTaken = ({ status }: AuthFailure) => status === 409;
