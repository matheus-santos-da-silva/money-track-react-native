import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: Colors.expenseTint,
  },

  texts: {
    flex: 1,
    alignItems: "flex-start",
  },

  message: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.expenseText,
  },

  action: {
    minHeight: 32,
    justifyContent: "center",
  },

  actionText: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.expenseText,
    textDecorationLine: "underline",
  },
});
