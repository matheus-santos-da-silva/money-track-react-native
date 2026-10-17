import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },

  rule: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.35)",
  },

  name: {
    fontFamily: Fonts.semiBold,
    lineHeight: 24,
    color: Colors.surface,
  },
});
