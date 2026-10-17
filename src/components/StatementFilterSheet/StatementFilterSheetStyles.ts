import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Percentual do overlay (e não da janela): com o teclado aberto o sheet encolhe junto.
  sheet: {
    maxHeight: "88%",
  },

  dragArea: {
    gap: 16,
  },

  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    lineHeight: 26,
    color: Colors.ink,
  },

  scroll: {
    flexShrink: 1,
  },

  content: {
    gap: 20,
    paddingBottom: 4,
  },

  section: {
    gap: 10,
  },

  sectionTitle: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  dateValue: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.ink,
    fontVariant: ["tabular-nums"],
  },

  // Campo de data ou de valor.
  field: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.chipBorder,
    paddingHorizontal: 16,
    justifyContent: "center",
  },

  fieldLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.muted,
  },

  amountInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  amountPrefix: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.ink,
  },

  amountInput: {
    flex: 1,
    height: 24,
    padding: 0,
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: Colors.ink,
    fontVariant: ["tabular-nums"],
  },

  footerButton: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  clearButton: {
    borderWidth: 1.5,
    borderColor: Colors.borderStrong,
  },

  clearText: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.ink,
  },

  applyButton: {
    backgroundColor: Colors.brandBlue,
  },

  applyText: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.surface,
  },
});
