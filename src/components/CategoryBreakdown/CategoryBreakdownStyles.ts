import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 18,
    gap: 14,
  },

  heading: {
    gap: 2,
  },

  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.ink,
  },

  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
    fontVariant: ["tabular-nums"],
  },

  tabs: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 14,
    backgroundColor: Colors.chip,
  },

  tab: {
    flex: 1,
    height: 40,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  tabSelected: {
    backgroundColor: Colors.surface,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },

  tabText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.muted,
  },

  tabTextSelected: {
    color: Colors.ink,
  },

  list: {
    gap: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  rowBody: {
    flex: 1,
    gap: 6,
  },

  rowTop: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 8,
  },

  name: {
    flexShrink: 1,
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
  },

  total: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
    fontVariant: ["tabular-nums"],
  },

  rowBottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  track: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.chip,
    overflow: "hidden",
  },

  fill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.brandBlue,
  },

  percent: {
    width: 34,
    textAlign: "right",
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
    fontVariant: ["tabular-nums"],
  },

  empty: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
    textAlign: "center",
  },

  toggle: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -4,
  },

  toggleText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.brandBlue,
  },
});
