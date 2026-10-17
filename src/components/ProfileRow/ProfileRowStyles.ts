import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },

  divider: {
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },

  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.chip,
    alignItems: "center",
    justifyContent: "center",
  },

  texts: {
    flex: 1,
  },

  title: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 21,
    color: Colors.ink,
  },

  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
  },
});
