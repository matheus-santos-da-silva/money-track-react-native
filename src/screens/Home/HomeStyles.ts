import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundGray,
    flex: 1,
    justifyContent: "space-between",
  },

  /* Top Blue Menu */
  topMenu: {
    width: 412,
    height: 240,
    backgroundColor: "#407BFF",
    alignItems: "center",
    gap: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topMenuContent: {
    marginTop: 24,
    width: 350,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#363636",
    alignItems: "center",
    justifyContent: "center",
  },
  profileLetter: {
    fontSize: 26,
    color: "#B1B1B1",
    fontFamily: "KonkhmerSleokchher-Regular",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  middleMenuContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  amountTotalText: {
    color: "white",
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    lineHeight: 18,
  },
  amount: {
    color: "white",
    fontSize: 30,
    lineHeight: 40,
  },
  EyeIconView: {
    width: 24,
    height: 24,
    marginLeft: 330,
  },
  greetingText: {
    fontSize: 16,
    color: "white",
    marginLeft: 14,
    fontFamily: "Poppins-Regular",
  },

  /* Main Content */
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: 500,
  },
  monthContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingBottom: 20,
  },
  monthText: {
    fontSize: 20,
    color: Colors.primaryGray,
  },
  mainContent: {
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
  },

  /* Error styles */
  errorCard: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFEBEE",
  },
  errorIconContainer: {
    backgroundColor: "#FFEBEE",
    width: 52,
    height: 52,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -200,
  },
  errorTitle: {
    color: "#FF6B6B",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  errorMessage: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    flexDirection: "row",
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: "center",
    gap: 8,
  },
  retryButtonText: {
    color: "#FFF",
    fontWeight: "500",
    fontSize: 16,
  },
});
