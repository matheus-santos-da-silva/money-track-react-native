import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const CHART_HEIGHT = 150;

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
  },

  selection: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: Colors.ground,
  },

  selectionTitle: {
    flexShrink: 1,
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
    fontVariant: ["tabular-nums"],
  },

  selectionComparison: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
  },

  plot: {
    height: CHART_HEIGHT,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  column: {
    flex: 1,
    height: CHART_HEIGHT,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  bar: {
    width: 28,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: Colors.barIdle,
  },

  barSelected: {
    backgroundColor: Colors.brandBlue,
  },

  averageLine: {
    position: "absolute",
    left: 0,
    right: 0,
  },

  averageLabel: {
    position: "absolute",
    right: 0,
    paddingLeft: 4,
    backgroundColor: Colors.surface,
    fontFamily: Fonts.regular,
    fontSize: 11,
    lineHeight: 15,
    color: Colors.muted,
  },

  loader: {
    ...StyleSheet.absoluteFillObject,
  },

  labels: {
    flexDirection: "row",
    marginTop: 8,
  },

  monthLabel: {
    flex: 1,
    textAlign: "center",
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
  },

  monthLabelSelected: {
    fontFamily: Fonts.semiBold,
    color: Colors.ink,
  },

  error: {
    height: CHART_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  errorText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
    textAlign: "center",
  },

  retry: {
    height: 44,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  retryText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.brandBlue,
  },
});
