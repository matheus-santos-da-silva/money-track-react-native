import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

// Altura do sheet sem a área segura inferior: de onde a animação de entrada parte.
export const SHEET_HEIGHT = 312;

export const styles = StyleSheet.create({
  titleContainer: {
    gap: 2,
  },

  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    lineHeight: 26,
    color: Colors.ink,
  },

  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.muted,
  },

  optionsContainer: {
    flexDirection: "row",
    gap: 12,
  },

  optionCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    gap: 14,
  },

  expenseCard: {
    backgroundColor: Colors.expenseTint,
  },

  incomeCard: {
    backgroundColor: Colors.incomeTint,
  },

  optionChip: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  expenseChip: {
    backgroundColor: Colors.expenseText,
  },

  incomeChip: {
    backgroundColor: Colors.incomeText,
  },

  optionTexts: {
    gap: 2,
  },

  optionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.ink,
  },

  optionSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: "#4A546B",
  },

  cancelButton: {
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.muted,
  },
});
