import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ground,
  },

  header: {
    backgroundColor: Colors.brandBlue,
    paddingHorizontal: 12,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    gap: 12,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  close: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    lineHeight: 26,
    color: Colors.surface,
  },

  typeSwitch: {
    marginHorizontal: 48,
  },

  amountButton: {
    paddingTop: 4,
    alignItems: "center",
  },

  amountLabel: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.onBlueMuted,
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  amount: {
    fontFamily: Fonts.semiBold,
    fontSize: 40,
    lineHeight: 52,
    letterSpacing: -1,
    color: Colors.surface,
    fontVariant: ["tabular-nums"],
  },

  amountEmpty: {
    opacity: 0.7,
  },

  body: {
    flex: 1,
  },

  content: {
    paddingTop: 18,
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 20,
  },

  notice: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: Colors.brandTintStrong,
  },

  noticeText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.brandInk,
  },

  section: {
    gap: 8,
  },

  locked: {
    opacity: 0.6,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionLabel: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.ink,
  },

  textButton: {
    height: 32,
    justifyContent: "center",
  },

  textButtonLabel: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.brandBlue,
  },

  shortcutsScroll: {
    marginHorizontal: -20,
  },

  shortcuts: {
    paddingHorizontal: 20,
    paddingVertical: 2,
    gap: 6,
  },

  shortcut: {
    width: 70,
  },

  shortcutPlaceholder: {
    width: 70,
    height: 79,
    alignItems: "center",
    paddingTop: 5,
  },

  placeholderCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.chip,
  },

  categoriesError: {
    alignItems: "flex-start",
  },

  categoriesErrorText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.expenseText,
  },

  optionsRow: {
    flexDirection: "row",
    gap: 8,
  },

  recurrenceCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },

  recurrenceSummary: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
  },

  footer: {
    paddingTop: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.ground,
  },
});
