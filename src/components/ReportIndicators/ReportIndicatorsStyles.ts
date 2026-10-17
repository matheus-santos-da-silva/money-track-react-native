import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
  },

  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 14,
    gap: 6,
  },

  label: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
  },

  value: {
    fontFamily: Fonts.semiBold,
    fontSize: 22,
    lineHeight: 28,
    color: Colors.ink,
    fontVariant: ["tabular-nums"],
  },

  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border,
    overflow: "hidden",
  },

  fill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.brandBlue,
  },

  caption: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
  },
});
