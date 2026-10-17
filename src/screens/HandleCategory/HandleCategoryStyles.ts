import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  preview: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  previewCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  previewCircleEmpty: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: Colors.refLine,
  },

  previewTexts: {
    flex: 1,
    gap: 2,
  },

  previewLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
  },

  previewName: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.ink,
  },

  previewNameEmpty: {
    color: Colors.refLine,
  },

  typeTag: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: 18,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },

  expenseTag: {
    color: Colors.expenseText,
    backgroundColor: Colors.expenseTint,
  },

  incomeTag: {
    color: Colors.incomeText,
    backgroundColor: Colors.incomeTint,
  },

  group: {
    gap: 8,
  },

  groupLabel: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.ink,
  },

  groupHint: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
  },

  counter: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
    fontVariant: ["tabular-nums"],
  },

  counterFull: {
    color: Colors.expenseText,
  },

  gridSpacer: {
    flex: 1,
  },

  iconGrid: {
    gap: 8,
  },

  iconRow: {
    flexDirection: "row",
    gap: 8,
  },

  iconOption: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.chipBorder,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  iconOptionSelected: {
    borderWidth: 2,
    borderColor: Colors.brandBlue,
    backgroundColor: Colors.brandTint,
  },

  iconOptionCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  colorRow: {
    flexDirection: "row",
    gap: 4,
  },

  colorOption: {
    flex: 1,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  colorRing: {
    position: "absolute",
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
  },

  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
