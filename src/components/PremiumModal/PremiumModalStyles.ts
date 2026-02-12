import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingBottom: 24,
    maxHeight: "88%",
  },

  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 2.5,
    marginBottom: 20,
    alignSelf: "center",
  },

  headerContainer: {
    marginBottom: 24,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.primaryGray,
  },

  subtitle: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
    lineHeight: 16,
    fontFamily: "Poppins-Regular",
  },

  urgencyBadge: {
    backgroundColor: "#FFF3E0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#FFB74D",
  },

  urgencyText: {
    color: "#F57C00",
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
  },

  scrollContent: {
    width: "100%",
    paddingBottom: 20,
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
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
    marginBottom: 8,
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
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  planTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "KonkhmerSleokchher-Regular",
    color: Colors.primaryGray,
    marginBottom: 4,
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },

  planPrice: {
    fontSize: 24,
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

  planDescription: {
    fontSize: 12,
    color: Colors.primaryGray,
    marginBottom: 16,
    fontFamily: "Poppins-Regular",
    lineHeight: 18,
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
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#F0F7FF",
    borderRadius: 12,
    marginTop: 8,
  },

  guaranteeText: {
    fontSize: 12,
    color: Colors.primaryBlue,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: Colors.primaryGray,
  },
});
