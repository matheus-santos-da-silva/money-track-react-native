import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

// Altura do sheet sem a área segura inferior: de onde a animação de entrada parte.
export const SHEET_HEIGHT = 406;

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    lineHeight: 26,
    color: Colors.ink,
  },

  yearContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  yearButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.chip,
    alignItems: "center",
    justifyContent: "center",
  },

  yearText: {
    minWidth: 60,
    textAlign: "center",
    fontFamily: Fonts.semiBold,
    fontSize: 17,
    lineHeight: 24,
    color: Colors.ink,
    fontVariant: ["tabular-nums"],
  },

  monthsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  // 30% + crescimento: três colunas iguais, já descontado o intervalo.
  monthButton: {
    flexBasis: "30%",
    flexGrow: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.chip,
    alignItems: "center",
    justifyContent: "center",
  },

  monthSelected: {
    backgroundColor: Colors.brandBlue,
  },

  monthText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
  },

  monthTextSelected: {
    fontFamily: Fonts.semiBold,
    color: Colors.surface,
  },

  currentMonthButton: {
    height: 48,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
  },

  currentMonthText: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.ink,
  },
});
