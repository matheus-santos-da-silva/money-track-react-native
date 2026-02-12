import { styles } from "./PlansStyles";
import { Colors } from "../../styles/colors";
import { CustomText } from "../../components/CustomText/CustomText";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, FC } from "react";
import { ErrorCode, requestPurchase, useIAP } from "react-native-iap";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import BackButton from "../../assets/images/back-btn.svg";

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
    description: "Melhor custo-benefício. 2 meses grátis!",
    savings: "Economize R$ 48,90",
    discount: "21% OFF",
  },
];

const USE_MOCK = false;

export const Plans: FC = () => {
  const navigation = useNavigation();
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
    loadProducts();
  }, [connected]);

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

  const renderItem = ({ item }: { item: Product }) => {
    const isRecommended = item.productId === "plano_anual";

    return (
      <TouchableOpacity
        style={[styles.card, isRecommended && styles.cardRecommended]}
        onPress={() => handleSubscribe(item.productId)}
        activeOpacity={0.9}
      >
        {isRecommended && (
          <View style={styles.recommendedBadge}>
            <Text style={styles.recommendedText}>⭐ Mais Popular</Text>
          </View>
        )}

        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}

        <View style={styles.cardHeader}>
          <CustomText style={styles.title}>{item.title}</CustomText>
          <View style={styles.priceContainer}>
            <CustomText style={styles.price}>{item.localizedPrice}</CustomText>
            {item.pricePerMonth && (
              <Text style={styles.pricePerMonth}>{item.pricePerMonth}</Text>
            )}
          </View>
        </View>

        {item.savings && (
          <Text style={styles.savingsText}>💰 {item.savings}</Text>
        )}

        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {isRecommended ? "Garantir Desconto" : "Começar Agora"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <BackButton height={20} width={20} />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerContainer}>
          <CustomText style={styles.header}>
            Continue transformando suas finanças! 🚀
          </CustomText>
          <Text style={styles.subtitle}>
            Transforme sua relação com o dinheiro hoje mesmo
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
          <>
            <FlatList
              data={products}
              keyExtractor={(item) => item.productId}
              renderItem={renderItem}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
            />

            <View style={styles.guaranteeContainer}>
              <Text style={styles.guaranteeText}>
                🛡️ Garantia de 7 dias ou seu dinheiro de volta
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};
