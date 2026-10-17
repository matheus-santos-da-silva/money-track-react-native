import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.brandBlue,
    paddingHorizontal: 24,
    paddingBottom: 56,
    overflow: "hidden",
  },

  ring: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    right: -110,
    top: -120,
    backgroundColor: Colors.brandRing1,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  back: {
    width: 44,
    height: 44,
    marginLeft: -12,
    alignItems: "center",
    justifyContent: "center",
  },

  step: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.onBlueMuted,
  },

  progress: {
    marginTop: 10,
    flexDirection: "row",
    gap: 6,
  },

  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  segmentDone: {
    backgroundColor: Colors.surface,
  },

  title: {
    marginTop: 24,
    fontFamily: Fonts.bold,
    fontSize: 28,
    lineHeight: 35,
    letterSpacing: -0.5,
    color: Colors.surface,
  },

  subtitle: {
    marginTop: 8,
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.onBlueMuted,
  },
});
