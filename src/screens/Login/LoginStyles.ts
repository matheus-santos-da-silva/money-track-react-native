import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  top: {
    backgroundColor: Colors.brandBlue,
    overflow: "hidden",
  },

  ring: {
    position: "absolute",
  },

  ringOuter: {
    width: 380,
    height: 380,
    borderRadius: 190,
    right: -120,
    top: -80,
    backgroundColor: Colors.brandRing1,
  },

  ringInner: {
    width: 220,
    height: 220,
    borderRadius: 110,
    right: -30,
    top: 10,
    backgroundColor: Colors.brandRing2,
  },

  topRow: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  back: {
    width: 44,
    height: 44,
    marginLeft: -12,
    alignItems: "center",
    justifyContent: "center",
  },

  illustration: {
    position: "absolute",
    left: 24,
    right: 24,
  },

  heading: {
    gap: 4,
  },

  title: {
    fontFamily: Fonts.bold,
    fontSize: 26,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: Colors.ink,
  },

  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.muted,
  },

  fields: {
    gap: 16,
  },

  spacer: {
    flexGrow: 1,
  },
});
