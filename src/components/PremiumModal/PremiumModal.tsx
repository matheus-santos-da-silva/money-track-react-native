import { FC, useEffect, useState } from "react";
import { styles } from "./PremiumModalStyles";
import { CustomText } from "../CustomText/CustomText";
import { ErrorCode, requestPurchase, useIAP } from "react-native-iap";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Modal from "react-native-modal";
import { Colors } from "../../styles/colors";

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

const MOCK_PRODUCTS: Product[] = [
  {
    productId: "plano_mensal",
    title: "Plano Mensal",
    localizedPrice: "R$ 19,90",
    pricePerMonth: "R$ 19,90/mês",
    description: "Flexibilidade total. Cancele quando quiser.",
  },
  {
    productId: "plano_anual",
    title: "Plano Anual",
    localizedPrice: "R$ 189,90",
    pricePerMonth: "R$ 15,82/mês",
    description: "Melhor custo-benefício.",
    savings: "Economize R$ 48,90",
    discount: "21% OFF",
  },
];

// Flag para controlar se usa mock ou API real
const USE_MOCK = true;

interface PremiumModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubscribe?: (productId: string) => void;
}

export const PremiumModal: FC<PremiumModalProps> = ({
  isVisible,
  onClose,
  onSubscribe,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let filteredSubscriptions = [];

  const {
    connected,
    subscriptions,
    getActiveSubscriptions,
    finishTransaction,
  } = useIAP({
    onPurchaseSuccess: async (purchase) => {
      console.log("✅ Compra bem-sucedida:", purchase);
      // IMPORTANTE: Validar no seu backend antes de finalizar
      // const isValid = await validatePurchaseOnBackend(purchase);
      // if (isValid) {
      await finishTransaction({ purchase, isConsumable: false });
      // Aqui você pode navegar para tela de sucesso, atualizar estado do usuário, etc.
      // }
    },

    onPurchaseError: (error) => {
      if (error.code !== ErrorCode.UserCancelled) {
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
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProducts(MOCK_PRODUCTS);
      } else {
        if (connected) await getActiveSubscriptions(productIds);
      }
    } catch (e) {
      console.log("Erro ao carregar planos:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!USE_MOCK && subscriptions.length > 0) {
      const formattedProducts = subscriptions.map((sub) => ({
        productId: sub.id,
        title: sub.title || "Plano",
        localizedPrice: `R$ ${sub.price}`,
        pricePerMonth: `R$ ${sub.price}`,
        description: sub.description || "",
      }));

      setProducts(formattedProducts);
    }
  }, [subscriptions]);

  const handleSubscribe = async (productId: string) => {
    try {
      if (USE_MOCK) {
        console.log("MOCK - Assinatura:", productId);
      } else {
        await requestPurchase({
          request: {
            google: {
              skus: [productId],
            },
          },
          type: "subs",
        });
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
