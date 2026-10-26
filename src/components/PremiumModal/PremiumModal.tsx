import { styles } from "./PremiumModalStyles";
import { Colors } from "../../styles/colors";
import { CustomText } from "../CustomText/CustomText";
import { usePremiumProducts } from "../../hooks/usePremiumProducts";
import { ANNUAL_PRODUCT_ID } from "../../utils/premium-products";
import { FC, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Modal from "react-native-modal";

interface PremiumModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubscribe?: (productId: string) => void;
}

// A validação da compra fica no PurchaseListener (montado uma vez em App.tsx).
export const PremiumModal: FC<PremiumModalProps> = ({ isVisible, onClose }) => {
  const { connected, products, isLoading, loadProducts, subscribe } =
    usePremiumProducts();

  useEffect(() => {
    if (isVisible) loadProducts();
  }, [isVisible, connected]);

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
              const isRecommended = item.productId === ANNUAL_PRODUCT_ID;
              return (
                <TouchableOpacity
                  key={item.productId}
                  activeOpacity={0.9}
                  style={[styles.card, isRecommended && styles.cardRecommended]}
                  onPress={() => subscribe(item.productId)}
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
