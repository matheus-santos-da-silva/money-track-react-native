import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  frame: {
    width: "100%",
  },

  sheet: {
    flexShrink: 1,
    gap: 14,
  },

  top: {
    gap: 14,
  },

  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    lineHeight: 26,
    color: Colors.ink,
  },

  search: {
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.ground,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  searchInput: {
    flex: 1,
    height: 44,
    padding: 0,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.ink,
  },

  list: {
    flexShrink: 1,
  },

  loader: {
    marginVertical: 32,
  },

  empty: {
    marginBottom: 8,
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.muted,
    textAlign: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 8,
  },

  cell: {
    width: "25%",
    paddingHorizontal: 2,
    paddingVertical: 6,
  },

  create: {
    alignItems: "center",
    gap: 6,
  },

  createCircle: {
    marginTop: 5,
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: Colors.brandBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  createText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.brandBlue,
  },
});
