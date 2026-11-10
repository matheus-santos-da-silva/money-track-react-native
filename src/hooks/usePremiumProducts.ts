import { useCallback, useMemo, useState } from "react";
import { useIAP } from "react-native-iap";
import { formatProduct, PRODUCT_IDS } from "../utils/premium-products";

// Planos da loja e o início da compra. O resultado da compra (validação no servidor)
// é tratado num lugar só, pelo PurchaseListener: aqui o useIAP é usado sem callbacks,
// senão cada tela montada validaria a mesma compra.
export const usePremiumProducts = () => {
  const { connected, subscriptions, fetchProducts, requestPurchase } = useIAP();
  const [isLoading, setIsLoading] = useState(true);

  const products = useMemo(() => subscriptions.map(formatProduct), [
    subscriptions,
  ]);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      if (connected) await fetchProducts({ skus: PRODUCT_IDS, type: "subs" });
    } catch (error) {
      console.log("Erro ao carregar planos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [connected, fetchProducts]);

  const subscribe = async (productId: string) => {
    try {
      const sub = subscriptions.find((s) => s.id === productId);
      const offerToken =
        sub?.platform === "android"
          ? sub.subscriptionOffers?.[0]?.offerTokenAndroid ?? ""
          : "";
      await requestPurchase({
        type: "subs",
        request: {
          google: {
            skus: [productId],
            subscriptionOffers: [{ sku: productId, offerToken }],
          },
          apple: { sku: productId },
        },
      });
    } catch (error) {
      console.log("Erro ao assinar:", error);
    }
  };

  return { connected, products, isLoading, setIsLoading, loadProducts, subscribe };
};
