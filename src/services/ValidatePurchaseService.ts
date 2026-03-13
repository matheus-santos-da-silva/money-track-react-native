import axios from "axios";
import { USERS_SERVICE_URL } from "@env";

interface ValidatePurchaseResponse {
  success: boolean;
  message?: string;
}

export const ValidatePurchase = async (
  purchaseToken: string,
  productId: string,
  token: string,
): Promise<ValidatePurchaseResponse> => {
  try {
    await axios.post(
      `${USERS_SERVICE_URL}/subscriptions/validate`,
      { purchaseToken, productId },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Erro ao validar compra";
      return { success: false, message };
    }

    return { success: false, message: "Erro de rede ou desconhecido" };
  }
};
