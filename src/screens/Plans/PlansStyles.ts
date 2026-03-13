import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  backButton: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 14,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  headerContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: "center",
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.primaryGray,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Poppins-Regular",
    marginBottom: 12,
  },

  urgencyBadge: {
    backgroundColor: "#FFF3E0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#FFB74D",
  },

  urgencyText: {
    color: "#F57C00",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
  },

  listContent: {
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    position: "relative",
  },

  cardRecommended: {
    borderColor: Colors.primaryBlue,
    borderWidth: 2,
    shadowColor: Colors.primaryBlue,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  recommendedBadge: {
    backgroundColor: Colors.primaryBlue,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    borderRadius: 12,
    marginBottom: 12,
  },

  recommendedText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },

  discountBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF5722",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    shadowColor: "#FF5722",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    zIndex: 10,
  },

  discountText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
  },

  cardHeader: {
    marginBottom: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "KonkhmerSleokchher-Regular",
    color: Colors.primaryGray,
    marginBottom: 4,
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    flexWrap: "wrap",
  },

  price: {
    fontSize: 26,
    fontWeight: "700",
    fontFamily: "KonkhmerSleokchher-Regular",
    color: Colors.primaryBlue,
  },

  pricePerMonth: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Poppins-Regular",
  },

  savingsText: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
    marginBottom: 8,
    backgroundColor: "#E8F5E9",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  description: {
    fontSize: 13,
    color: Colors.primaryGray,
    marginBottom: 16,
    fontFamily: "Poppins-Regular",
    lineHeight: 20,
  },

  button: {
    backgroundColor: Colors.primaryBlue,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: Colors.primaryBlue,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "KonkhmerSleokchher-Regular",
  },

  guaranteeContainer: {
    marginHorizontal: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#F0F7FF",
    borderRadius: 12,
    marginTop: 8,
  },

  guaranteeText: {
    fontSize: 13,
    color: Colors.primaryBlue,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
    minHeight: 300,
  },

  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: "#666666",
    fontFamily: "Poppins-Regular",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 32,
    minHeight: 400,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primaryGray,
    fontFamily: "KonkhmerSleokchher-Regular",
    textAlign: "center",
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 14,
    color: "#888888",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    lineHeight: 22,
  },

  // --- Active plan ---

  activePlanContainer: {
    paddingHorizontal: 24,
  },

  premiumCard: {
    backgroundColor: "#0F1C3F",
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#407BFF",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },

  premiumCardGlow: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(64, 123, 255, 0.15)",
  },

  premiumTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  premiumBadge: {
    backgroundColor: "rgba(64, 123, 255, 0.25)",
    borderWidth: 1,
    borderColor: Colors.primaryBlue,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  premiumBadgeText: {
    color: Colors.primaryBlue,
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
    letterSpacing: 1,
  },

  crownIcon: {
    fontSize: 28,
  },

  premiumPlanName: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "KonkhmerSleokchher-Regular",
    color: "#FFFFFF",
    marginBottom: 6,
  },

  premiumSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "Poppins-Regular",
    lineHeight: 20,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 20,
  },

  featuresContainer: {
    gap: 12,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  featureCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(64, 123, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  featureCheckText: {
    color: Colors.primaryBlue,
    fontSize: 12,
    fontWeight: "700",
  },

  featureText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    fontFamily: "Poppins-Regular",
  },

  infoCard: {
    backgroundColor: "#F0F7FF",
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primaryBlue,
  },

  infoCardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.primaryGray,
    fontFamily: "Poppins-Regular",
    marginBottom: 4,
  },

  infoCardText: {
    fontSize: 13,
    color: "#888888",
    fontFamily: "Poppins-Regular",
    lineHeight: 20,
  },

  // --- Trial card ---

  trialCard: {
    backgroundColor: "#0F1C3F",
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(64,123,255,0.3)",
    shadowColor: "#407BFF",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },

  trialBadge: {
    backgroundColor: "rgba(255, 183, 77, 0.2)",
    borderWidth: 1,
    borderColor: "#FFB74D",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  trialBadgeText: {
    color: "#FFB74D",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
    letterSpacing: 1,
  },

  trialPlanName: {
    fontSize: 26,
    fontWeight: "700",
    fontFamily: "KonkhmerSleokchher-Regular",
    color: "#FFFFFF",
    marginBottom: 16,
  },

  daysRemainingContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 6,
  },

  daysRemainingNumber: {
    fontSize: 52,
    fontWeight: "700",
    fontFamily: "KonkhmerSleokchher-Regular",
    color: "#FFB74D",
    lineHeight: 58,
  },

  daysRemainingLabel: {
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "Poppins-Regular",
  },

  trialExpiryText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "Poppins-Regular",
    marginBottom: 4,
  },

  upgradePrompt: {
    backgroundColor: "#FFF8E7",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#FFB74D",
  },

  upgradePromptTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#E65100",
    fontFamily: "Poppins-Regular",
    marginBottom: 4,
  },

  upgradePromptText: {
    fontSize: 13,
    color: "#888",
    fontFamily: "Poppins-Regular",
    lineHeight: 20,
  },

  seePlansButton: {
    backgroundColor: Colors.primaryBlue,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: Colors.primaryBlue,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },

  seePlansButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "KonkhmerSleokchher-Regular",
  },
});
