import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },

  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  iconCircle: {
    borderRadius: 20,
  },

  texts: {
    flex: 1,
  },

  title: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
  },

  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.muted,
  },

  amount: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
    fontVariant: ["tabular-nums"],
  },

  expense: {
    color: Colors.expenseText,
  },

  income: {
    color: Colors.incomeText,
  },
});
