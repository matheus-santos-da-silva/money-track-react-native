import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonLarge: {
    height: 54,
  },

  primary: {
    backgroundColor: Colors.brandBlue,
  },

  primaryDisabled: {
    backgroundColor: Colors.disabledFill,
  },

  danger: {
    backgroundColor: Colors.expenseText,
  },

  dangerDisabled: {
    backgroundColor: Colors.dangerDisabled,
  },

  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.surface,
  },

  labelLarge: {
    fontSize: 16,
    lineHeight: 24,
  },
});
