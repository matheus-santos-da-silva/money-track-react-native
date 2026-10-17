import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  fields: {
    gap: 16,
  },

  hint: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
  },

  trial: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: Colors.brandTint,
  },

  trialChip: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.brandBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  trialTexts: {
    flex: 1,
    gap: 2,
  },

  trialTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.brandInk,
  },

  trialText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.brandInk,
  },

  spacer: {
    flexGrow: 1,
  },
});
