import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  field: {
    gap: 6,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },

  label: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.ink,
  },

  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.chipBorder,
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 0,
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.ink,
  },

  inputGround: {
    backgroundColor: Colors.ground,
  },

  inputSecure: {
    paddingRight: 52,
  },

  inputFocused: {
    borderColor: Colors.brandBlue,
  },

  optional: {
    fontFamily: Fonts.regular,
    color: Colors.muted,
  },

  inputError: {
    borderColor: Colors.expenseText,
  },

  toggle: {
    position: "absolute",
    right: 4,
    top: 4,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  error: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.expenseText,
  },
});
