import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  texts: {
    flex: 1,
  },

  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.ink,
    fontVariant: ["tabular-nums"],
  },

  detail: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
  },

  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  step: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.chip,
    alignItems: "center",
    justifyContent: "center",
  },

  stepDisabled: {
    opacity: 0.4,
  },

  count: {
    minWidth: 36,
    textAlign: "center",
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.ink,
    fontVariant: ["tabular-nums"],
  },
});
