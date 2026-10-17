import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  choice: {
    alignItems: "center",
    gap: 1,
  },

  ring: {
    padding: 3,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "transparent",
  },

  circle: {
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    alignSelf: "stretch",
    textAlign: "center",
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.ink,
  },

  nameSelected: {
    fontFamily: Fonts.semiBold,
  },
});
