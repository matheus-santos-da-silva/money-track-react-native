import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundGray,
    flex: 1,
    justifyContent: "flex-start",
  },

  justify: {
    justifyContent: "center",
    alignItems: "center",
  },

  topMenu: {
    width: "100%",
    gap: 12,
    flex: 0.4,
    minHeight: 120,
    maxHeight: 190,
    alignItems: "center",
    backgroundColor: Colors.primaryBlue,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    marginBottom: 8,
  },

  title: {
    marginTop: 12,
    alignItems: "center",
  },

  /* Main Content */
  mainContainer: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    gap: 22,
  },

  totalAmountDiv: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  cardTotalAmount: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 70,
    padding: 3,
    width: "30%",
  },

  cardTotalAmountTitle: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },

  cardTotalAmountText: {
    color: Colors.primaryGray,
    fontSize: 10,
  },

  cardTotalAmountValue: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Charts Cards */

  chartsCards: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    height: 230,
  },

  chartsCardsTitleDiv: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 14,
  },

  chartsCardsTitle: {
    fontSize: 16,
    color: Colors.primaryGray,
  },

  subtitle: {
    width: "50%",
    gap: 3,
  },

  data: {
    flexDirection: "row",
    gap: 10,
  },

  withoutAnyReportDiv: {
    height: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 12,
  },

  withoutOneReportDiv: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  messageText: {
    color: Colors.primaryGray,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 16,
    fontFamily: "Poppins-Regular",
  },

  loadingContainer: {
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
});
