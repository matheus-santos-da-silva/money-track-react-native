import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  chip: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.chipBorder,
    backgroundColor: Colors.surface,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  chipSelected: {
    borderColor: Colors.brandBlue,
    backgroundColor: Colors.brandTint,
  },

  label: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 18,
  },
});
