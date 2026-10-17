import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sheet: {
    gap: 14,
  },

  display: {
    alignItems: "center",
  },

  displayLabel: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
  },

  displayValue: {
    fontFamily: Fonts.semiBold,
    fontSize: 36,
    lineHeight: 46,
    fontVariant: ["tabular-nums"],
  },

  keypad: {
    gap: 8,
  },

  keyRow: {
    flexDirection: "row",
    gap: 8,
  },

  key: {
    flex: 1,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  digitKey: {
    backgroundColor: Colors.ground,
  },

  actionKey: {
    backgroundColor: Colors.border,
  },

  digitText: {
    fontFamily: Fonts.medium,
    fontSize: 22,
    lineHeight: 30,
    color: Colors.ink,
  },

  clearText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
  },

  confirm: {
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.brandBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  confirmText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.surface,
  },
});
