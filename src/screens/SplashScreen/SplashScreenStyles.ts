import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.brandBlue,
    overflow: "hidden",
  },

  ringOuter: {
    position: "absolute",
    backgroundColor: Colors.brandRing1,
  },

  ringInner: {
    position: "absolute",
    backgroundColor: Colors.brandRing2,
  },

  monogram: {
    position: "absolute",
  },

  nameRow: {
    position: "absolute",
    left: 0,
    right: 0,
  },

  name: {
    textAlign: "center",
    fontFamily: Fonts.semiBold,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.3,
    color: Colors.surface,
  },

  track: {
    position: "absolute",
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.25)",
    overflow: "hidden",
  },

  dash: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.surface,
  },

  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.ground,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
});
