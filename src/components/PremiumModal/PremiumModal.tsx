import { styles } from "./PremiumModalStyles";
import { Colors } from "../../styles/colors";
import { useAuth } from "../../hooks/useAuth";
import { CustomText } from "../CustomText/CustomText";
import { ValidatePurchase } from "../../services/ValidatePurchaseService";
import { FC, useEffect, useState } from "react";
import {
  ErrorCode,
  useIAP,
  SubscriptionAndroid,
  Subscription,
} from "react-native-iap";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";

import Modal from "react-native-modal";

const productIds = ["plano_mensal", "plano_anual"];

interface Product {
  productId: string;
  title: string;
  localizedPrice: string;
  pricePerMonth?: string;
  description: string;
  savings?: string;
  discount?: string;
}

interface PremiumModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubscribe?: (productId: string) => void;
}

const getPrice = (sub: Subscription): string => {
  if ("subscriptionOfferDetails" in sub) {
    return (
      sub.subscriptionOfferDetails?.[0]?.pricingPhases?.pricingPhaseList?.[0]
        ?.formattedPrice ?? ""
    );
  }
  return (sub as { localizedPrice?: string }).localizedPrice ?? "";
};

export const PremiumModal: FC<PremiumModalProps> = ({
  isVisible,
  onClose,
  onSubscribe,
}) => {
  const { userToken, refreshUser } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    connected,
    subscriptions,
    getSubscriptions,
    requestSubscription,
    finishTransaction,
  } = useIAP({
    onPurchaseSuccess: async (purchase) => {
      if (!userToken || !purchase.purchaseToken) return;

      const result = await ValidatePurchase(
        purchase.purchaseToken,
        purchase.productId,
        userToken.token,
      );

      if (result.success) {
        await finishTransaction({ purchase, isConsumable: false });
        refreshUser();
      } else {
        console.error("❌ Compra inválida:", result.message);
      }
    },

    onPurchaseError: (error) => {
      if (error.code !== ErrorCode.E_USER_CANCELLED) {
        console.error("❌ Erro na compra:", error);
      }
    },
  });

  useEffect(() => {
    if (isVisible) {
      loadProducts();
    }
  }, [isVisible, connected]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      if (connected) await getSubscriptions({ skus: productIds });
    } catch (e) {
      console.log("Erro ao carregar planos:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (subscriptions.length > 0) {
      const formattedProducts = subscriptions.map((sub) => ({
        productId: sub.productId,
        title: sub.title || "Plano",
        localizedPrice: getPrice(sub),
        pricePerMonth: getPrice(sub),
        description: sub.description || "",
      }));

      setProducts(formattedProducts);
    }
  }, [subscriptions]);

  const handleSubscribe = async (productId: string) => {
    try {
      if (Platform.OS === "android") {
        const sub = subscriptions.find(
          (s) => s.productId === productId,
        ) as SubscriptionAndroid;
        const offerToken = sub?.subscriptionOfferDetails?.[0]?.offerToken ?? "";
        await requestSubscription({
          subscriptionOffers: [{ sku: productId, offerToken }],
        });
      } else {
        await requestSubscription({ sku: productId });
      }
    } catch (err) {
      console.log("Erro ao assinar:", err);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={["down"]}
      style={styles.modal}
      propagateSwipe={true}
    >
      <View style={styles.container}>
        <View style={styles.dragIndicator} />

        <View style={styles.headerContainer}>
          <CustomText style={styles.title}>
            Continue transformando suas finanças! 🚀
          </CustomText>
          <Text style={styles.subtitle}>
            Junte-se a milhares de usuários que já controlam suas finanças
          </Text>
          <View style={styles.urgencyBadge}>
            <Text style={styles.urgencyText}>⚡ Oferta por tempo limitado</Text>
          </View>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primaryBlue} />
            <Text style={styles.loadingText}>Carregando planos...</Text>
          </View>
        ) : products.length === 0 ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              Nenhum plano disponível no momento.{"\n"}Tente novamente mais
              tarde.
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {products.map((item) => {
              const isRecommended = item.productId === "plano_anual";
              return (
                <TouchableOpacity
                  key={item.productId}
                  activeOpacity={0.9}
                  style={[styles.card, isRecommended && styles.cardRecommended]}
                  onPress={() => handleSubscribe(item.productId)}
                >
                  {isRecommended && (
                    <View style={styles.recommendedBadge}>
                      <Text style={styles.recommendedText}>
                        ⭐ Mais Popular
                      </Text>
                    </View>
                  )}

                  {item.discount && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{item.discount}</Text>
                    </View>
                  )}

                  <View style={styles.cardHeader}>
                    <CustomText style={styles.planTitle}>
                      {item.title}
                    </CustomText>
                    <View style={styles.priceContainer}>
                      <CustomText style={styles.planPrice}>
                        {item.localizedPrice}
                      </CustomText>
                      {item.pricePerMonth && (
                        <Text style={styles.pricePerMonth}>
                          {item.pricePerMonth}
                        </Text>
                      )}
                    </View>
                  </View>

                  {item.savings && (
                    <Text style={styles.savingsText}>💰 {item.savings}</Text>
                  )}

                  <CustomText style={styles.planDescription}>
                    {item.description}
                  </CustomText>

                  <View style={styles.button}>
                    <Text style={styles.buttonText}>
                      {isRecommended ? "Garantir Desconto" : "Começar Agora"}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            <View style={styles.guaranteeContainer}>
              <Text style={styles.guaranteeText}>
                🛡️ Garantia de 7 dias ou seu dinheiro de volta
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};
