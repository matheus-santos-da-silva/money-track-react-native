import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  field: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  input: {
    flex: 1,
    height: 44,
    padding: 0,
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.ink,
  },

  cancel: {
    height: 44,
    paddingHorizontal: 4,
    justifyContent: "center",
  },

  cancelText: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.surface,
  },
});
