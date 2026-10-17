import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  actionsSheet: {
    gap: 20,
  },

  confirmSheet: {
    gap: 14,
  },

  identity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  identityTexts: {
    flex: 1,
  },

  name: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    lineHeight: 25,
    color: Colors.ink,
  },

  typeText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
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

  dangerChip: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.expenseTint,
    alignItems: "center",
    justifyContent: "center",
  },

  confirmTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    lineHeight: 25,
    color: Colors.ink,
  },

  confirmText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.muted,
  },

  confirmActions: {
    marginTop: 6,
    gap: 4,
  },

  cancel: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.muted,
  },
});
