import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 18,
    gap: 14,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },

  balance: {
    gap: 4,
  },

  label: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
  },

  balanceValue: {
    fontFamily: Fonts.semiBold,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.5,
    color: Colors.ink,
    fontVariant: ["tabular-nums"],
  },

  loader: {
    alignSelf: "flex-start",
    height: 22,
  },

  tag: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  tagText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: 17,
  },

  tagUp: {
    backgroundColor: Colors.incomeTint,
  },

  tagUpText: {
    color: Colors.incomeText,
  },

  tagDown: {
    backgroundColor: Colors.expenseTint,
  },

  tagDownText: {
    color: Colors.expenseText,
  },

  tagSame: {
    backgroundColor: Colors.chip,
  },

  tagSameText: {
    color: Colors.muted,
  },

  columns: {
    flexDirection: "row",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingTop: 14,
  },

  column: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  columnIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  incomeIcon: {
    backgroundColor: Colors.incomeTint,
  },

  expenseIcon: {
    backgroundColor: Colors.expenseTint,
  },

  columnTexts: {
    flex: 1,
  },

  columnLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
  },

  columnValue: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.ink,
    fontVariant: ["tabular-nums"],
  },
});
