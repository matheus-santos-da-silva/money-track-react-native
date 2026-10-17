import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sheet: {
    gap: 18,
  },

  identity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  identityTexts: {
    flex: 1,
  },

  categoryName: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.ink,
  },

  dateText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
  },

  typeTag: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: 18,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },

  expenseTag: {
    color: Colors.expenseText,
    backgroundColor: Colors.expenseTint,
  },

  incomeTag: {
    color: Colors.incomeText,
    backgroundColor: Colors.incomeTint,
  },

  amountText: {
    fontFamily: Fonts.semiBold,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.5,
    fontVariant: ["tabular-nums"],
  },

  expenseAmount: {
    color: Colors.expenseText,
  },

  incomeAmount: {
    color: Colors.incomeText,
  },

  infoRow: {
    flexDirection: "row",
    gap: 10,
  },

  infoBlock: {
    flex: 1,
    backgroundColor: Colors.ground,
    borderRadius: 14,
    padding: 12,
    gap: 2,
  },

  infoLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.muted,
  },

  infoValue: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
  },

  description: {
    gap: 2,
  },

  descriptionText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.ink,
  },

  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },

  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  actionText: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 22,
  },

  deleteButton: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.expenseText,
  },

  deleteText: {
    color: Colors.expenseText,
  },

  editButton: {
    backgroundColor: Colors.brandBlue,
  },

  editText: {
    color: Colors.surface,
  },
});
