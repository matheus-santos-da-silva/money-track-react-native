import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 12,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: Colors.chip,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.ink,
    textAlign: "center",
  },

  message: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.muted,
    textAlign: "center",
  },

  button: {
    marginTop: 8,
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: Colors.brandBlue,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  buttonText: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.surface,
  },
});
