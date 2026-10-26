import { useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ErrorCode, Purchase, useIAP } from "react-native-iap";
import { ValidatePurchase } from "../../services/ValidatePurchaseService";

// Valida no servidor as compras concluídas. Fica montado uma vez só (em App.tsx):
// o onPurchaseSuccess do useIAP dispara em toda instância montada, então tratar a
// compra nas telas faria a mesma compra ser validada várias vezes.
export const PurchaseListener = () => {
  const { userToken, refreshUser } = useAuth();

  // Tokens já em validação ou validados nesta sessão.
  const handledTokens = useRef(new Set<string>());

  const { finishTransaction, clearCurrentPurchase } = useIAP({
    onPurchaseSuccess: async (purchase: Purchase) => {
      const { purchaseToken } = purchase;
      if (!userToken || !purchaseToken) return;
      if (handledTokens.current.has(purchaseToken)) return;

      handledTokens.current.add(purchaseToken);

      const result = await ValidatePurchase(
        purchaseToken,
        purchase.productId,
        userToken.token
      );

      if (result.success) {
        await finishTransaction({ purchase, isConsumable: false });
        refreshUser();
      } else {
        // Libera o token para uma nova tentativa (ex.: falha de rede).
        handledTokens.current.delete(purchaseToken);
        console.error("❌ Compra inválida:", result.message);
      }

      clearCurrentPurchase();
    },

    onPurchaseError: (error) => {
      if (error.code !== ErrorCode.E_USER_CANCELLED) {
        console.error("❌ Erro na compra:", error);
      }
    },
  });

  return null;
};
