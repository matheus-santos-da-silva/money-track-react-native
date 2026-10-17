import { Fonts } from "../../styles/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  rule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  ruleText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
  },
});
