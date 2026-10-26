import { styles } from "./PlansStyles";
import { Colors } from "../../styles/colors";
import { useAuth } from "../../hooks/useAuth";
import { CustomText } from "../../components/CustomText/CustomText";
import { useNavigation } from "@react-navigation/native";
import { usePremiumProducts } from "../../hooks/usePremiumProducts";
import { planSummary, trialDaysLeft } from "../../utils/plan-summary";
import { ANNUAL_PRODUCT_ID, PremiumProduct } from "../../utils/premium-products";
import { useEffect, useState, FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import BackButton from "../../assets/images/back-btn.svg";

const PREMIUM_FEATURES = [
  "Categorias ilimitadas",
  "Histórico completo de transações",
  "Relatórios e gráficos avançados",
  "Exportação de dados",
];

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const Plans: FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [showPlans, setShowPlans] = useState<boolean>(false);
  const { connected, products, isLoading, setIsLoading, loadProducts, subscribe } =
    usePremiumProducts();

  // O plano vem calculado pelo servidor (isPremium/isTrialActive): o app não refaz a regra.
  const planKind = user ? planSummary(user).kind : null;
  const isPremiumPlan = planKind === "premium";
  const isTrialActive = planKind === "trial";

  useEffect(() => {
    if (!isPremiumPlan && !isTrialActive) loadProducts();
    else setIsLoading(false);
  }, [connected, isPremiumPlan, isTrialActive]);

  const renderItem = ({ item }: { item: PremiumProduct }) => {
    const isRecommended = item.productId === ANNUAL_PRODUCT_ID;

    return (
      <TouchableOpacity
        style={[styles.card, isRecommended && styles.cardRecommended]}
        onPress={() => subscribe(item.productId)}
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

  const renderActivePlan = () => {
    if (isPremiumPlan) {
      return (
        <View style={styles.activePlanContainer}>
          <View style={styles.premiumCard}>
            <View style={styles.premiumCardGlow} />

            <View style={styles.premiumTopRow}>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>✦ ATIVO</Text>
              </View>
              <Text style={styles.crownIcon}>👑</Text>
            </View>

            <CustomText style={styles.premiumPlanName}>
              Plano Premium
            </CustomText>
            <Text style={styles.premiumSubtitle}>
              Você tem acesso completo a todos os recursos
            </Text>

            <View style={styles.divider} />

            <View style={styles.featuresContainer}>
              {PREMIUM_FEATURES.map((feature) => (
                <View key={feature} style={styles.featureRow}>
                  <View style={styles.featureCheck}>
                    <Text style={styles.featureCheckText}>✓</Text>
                  </View>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Assinatura ativa</Text>
            <Text style={styles.infoCardText}>
              Gerencie sua assinatura diretamente pela Google Play Store.
            </Text>
          </View>
        </View>
      );
    }

    if (isTrialActive && user?.trialEndsAt) {
      const daysRemaining = trialDaysLeft(user.trialEndsAt);

      return (
        <View style={styles.activePlanContainer}>
          <View style={styles.trialCard}>
            <View style={styles.premiumTopRow}>
              <View style={styles.trialBadge}>
                <Text style={styles.trialBadgeText}>✦ TRIAL ATIVO</Text>
              </View>
              <Text style={styles.crownIcon}>⚡</Text>
            </View>

            <CustomText style={styles.trialPlanName}>
              Período de Teste
            </CustomText>

            <View style={styles.daysRemainingContainer}>
              <Text style={styles.daysRemainingNumber}>
                {daysRemaining === 0 ? "Hoje" : daysRemaining}
              </Text>
              <Text style={styles.daysRemainingLabel}>
                {daysRemaining === 0
                  ? "é o último dia"
                  : daysRemaining === 1
                    ? "dia restante"
                    : "dias restantes"}
              </Text>
            </View>

            <Text style={styles.trialExpiryText}>
              Expira em {formatDate(user.trialEndsAt)}
            </Text>

            <View style={styles.divider} />

            <View style={styles.featuresContainer}>
              {PREMIUM_FEATURES.map((feature) => (
                <View key={feature} style={styles.featureRow}>
                  <View style={styles.featureCheck}>
                    <Text style={styles.featureCheckText}>✓</Text>
                  </View>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.upgradePrompt}>
            <Text style={styles.upgradePromptTitle}>Não perca seu acesso!</Text>
            <Text style={styles.upgradePromptText}>
              Assine um plano antes do trial acabar e continue aproveitando
              todos os recursos sem interrupção.
            </Text>
          </View>

          {showPlans ? (
            isLoading ? (
              <ActivityIndicator
                size="large"
                color={Colors.primaryBlue}
                style={{ marginVertical: 24 }}
              />
            ) : (
              <FlatList
                data={products}
                keyExtractor={(item) => item.productId}
                renderItem={renderItem}
                scrollEnabled={false}
                contentContainerStyle={styles.listContent}
              />
            )
          ) : (
            <TouchableOpacity
              style={styles.seePlansButton}
              onPress={() => {
                setShowPlans(true);
                loadProducts();
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.seePlansButtonText}>
                Tornar-se Premium 👑
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return null;
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
        {isLoading && !isPremiumPlan && !isTrialActive ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primaryBlue} />
            <Text style={styles.loadingText}>Carregando planos...</Text>
          </View>
        ) : isPremiumPlan || isTrialActive ? (
          renderActivePlan()
        ) : products.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>Nenhum plano encontrado</Text>
            <Text style={styles.emptyText}>
              Não foi possível carregar os planos no momento.{"\n"}Verifique sua
              conexão e tente novamente.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.headerContainer}>
              <CustomText style={styles.header}>
                Continue transformando suas finanças! 🚀
              </CustomText>
              <Text style={styles.subtitle}>
                Transforme sua relação com o dinheiro hoje mesmo
              </Text>
              <View style={styles.urgencyBadge}>
                <Text style={styles.urgencyText}>
                  ⚡ Oferta por tempo limitado
                </Text>
              </View>
            </View>

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
