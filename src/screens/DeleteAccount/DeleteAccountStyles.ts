import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  warning: {
    backgroundColor: Colors.expenseTint,
    borderRadius: 20,
    padding: 16,
    gap: 10,
  },

  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  warningTitle: {
    flex: 1,
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.expenseText,
  },

  warningText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.dangerInk,
  },

  notice: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
  },

  noticeText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.muted,
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
