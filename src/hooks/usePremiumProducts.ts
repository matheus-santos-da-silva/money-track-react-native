import { Platform } from "react-native";
import { useCallback, useMemo, useState } from "react";
import { SubscriptionAndroid, useIAP } from "react-native-iap";
import { formatProduct, PRODUCT_IDS } from "../utils/premium-products";

// Planos da loja e o início da compra. O resultado da compra (validação no servidor)
// é tratado num lugar só, pelo PurchaseListener: aqui o useIAP é usado sem callbacks,
// senão cada tela montada validaria a mesma compra.
export const usePremiumProducts = () => {
  const { connected, subscriptions, getSubscriptions, requestSubscription } =
    useIAP();
  const [isLoading, setIsLoading] = useState(true);

  const products = useMemo(() => subscriptions.map(formatProduct), [
    subscriptions,
  ]);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      if (connected) await getSubscriptions({ skus: PRODUCT_IDS });
    } catch (error) {
      console.log("Erro ao carregar planos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [connected, getSubscriptions]);

  const subscribe = async (productId: string) => {
    try {
      if (Platform.OS === "android") {
        const sub = subscriptions.find(
          (s) => s.productId === productId
        ) as SubscriptionAndroid;
        const offerToken = sub?.subscriptionOfferDetails?.[0]?.offerToken ?? "";
        await requestSubscription({
          subscriptionOffers: [{ sku: productId, offerToken }],
        });
      } else {
        await requestSubscription({ sku: productId });
      }
    } catch (error) {
      console.log("Erro ao assinar:", error);
    }
  };

  return { connected, products, isLoading, setIsLoading, loadProducts, subscribe };
};
