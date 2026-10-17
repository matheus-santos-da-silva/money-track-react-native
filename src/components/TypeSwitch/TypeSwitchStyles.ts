import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 14,
  },

  trackOnBlue: {
    backgroundColor: "rgba(255,255,255,0.16)",
  },

  trackLight: {
    backgroundColor: Colors.border,
  },

  disabled: {
    opacity: 0.6,
  },

  option: {
    flex: 1,
    height: 40,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  optionSelected: {
    backgroundColor: Colors.surface,
  },

  optionSelectedLight: {
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 1,
  },

  label: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
  },
});
