import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.brandBlue,
    overflow: "hidden",
  },

  ring: {
    position: "absolute",
  },

  ringOuter: {
    width: 520,
    height: 520,
    borderRadius: 260,
    left: -65,
    top: 40,
    backgroundColor: Colors.brandRing1,
  },

  ringInner: {
    width: 360,
    height: 360,
    borderRadius: 180,
    left: 15,
    top: 120,
    backgroundColor: Colors.brandRing2,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },

  logo: {
    height: 44,
    justifyContent: "center",
  },

  illustration: {
    marginTop: 28,
  },

  spacer: {
    flex: 1,
  },

  title: {
    fontFamily: Fonts.bold,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -1,
    color: Colors.surface,
  },

  titleShort: {
    fontSize: 30,
    lineHeight: 36,
  },

  text: {
    marginTop: 12,
    fontFamily: Fonts.regular,
    fontSize: 15,
    lineHeight: 23,
    color: Colors.onBlueMuted,
  },

  actions: {
    marginTop: 28,
    gap: 10,
  },

  button: {
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  primary: {
    backgroundColor: Colors.surface,
  },

  primaryText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.brandInk,
  },

  secondary: {
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.6)",
  },

  secondaryText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.surface,
  },
});
