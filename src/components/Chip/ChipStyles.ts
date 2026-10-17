import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  chip: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Colors.chipBorder,
    backgroundColor: Colors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  label: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.ink,
  },

  solidSelected: {
    backgroundColor: Colors.ink,
    borderColor: Colors.ink,
  },

  solidSelectedLabel: {
    color: Colors.surface,
  },

  tintSelected: {
    backgroundColor: Colors.brandTint,
    borderColor: Colors.brandBlue,
  },

  tintSelectedLabel: {
    color: Colors.brandInk,
  },

  removable: {
    maxWidth: "100%",
    paddingRight: 12,
    backgroundColor: Colors.brandTintStrong,
    borderColor: Colors.brandTintStrong,
  },

  removableLabel: {
    flexShrink: 1,
    color: Colors.brandInk,
  },
});
