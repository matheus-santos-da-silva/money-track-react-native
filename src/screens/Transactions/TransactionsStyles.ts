import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundGray,
    flex: 1,
    justifyContent: "flex-start",
  },

  /* Top Content */
  blueTopContainer: {
    height: "24%",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    backgroundColor: Colors.primaryBlue,
    paddingVertical: 16,
    gap: 20,
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
    flex: 1,
    width: "100%",
    marginTop: 10,
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
