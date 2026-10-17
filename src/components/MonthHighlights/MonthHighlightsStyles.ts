import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 18,
    gap: 4,
  },

  title: {
    marginBottom: 6,
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.ink,
  },

  row: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 10,
  },

  divider: {
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },

  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.chip,
    alignItems: "center",
    justifyContent: "center",
  },

  texts: {
    flex: 1,
    gap: 2,
  },

  rowTitle: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
  },

  rowText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.muted,
  },
});
