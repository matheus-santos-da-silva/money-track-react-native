import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 72,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  leftContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    paddingLeft: 18,
  },

  rightContent: {
    paddingRight: 18,
    alignItems: "center",
  },

  titleText: {
    color: Colors.primaryGray,
    maxWidth: 180,
    fontFamily: "Poppins-Regular",
  },

  typeText: {
    fontFamily: "Poppins-Regular",
    color: Colors.primaryGray,
    fontSize: 11,
  },

  valueText: {
    fontSize: 14,
    lineHeight: 16,
  },

  expenseColor: {
    color: "#E9523E",
  },

  incomeColor: {
    color: "#13AE5D",
  },
});
