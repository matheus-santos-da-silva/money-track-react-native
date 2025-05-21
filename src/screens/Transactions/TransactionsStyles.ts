import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundGray,
    flex: 1,
    justifyContent: "space-between",
  },

  /* Top Content */
  blueTopContainer: {
    height: 180,
    backgroundColor: Colors.primaryBlue,
    paddingTop: 16,
    gap: 35,
  },

  blueTopContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  title: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },

  topIcons: {
    flexDirection: "row",
    gap: 12,
  },

  mainContainer: {
    height: 540,
  },

  transactionsContent: {
    gap: 12,
  },

  transactionDateText: {
    fontSize: 14,
    color: Colors.primaryGray,
    paddingLeft: 14,
    paddingBottom: 6,
  },
});
