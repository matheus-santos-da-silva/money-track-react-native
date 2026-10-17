import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 14,
    gap: 10,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  chip: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
  },

  amount: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    lineHeight: 24,
    color: Colors.ink,
    fontVariant: ["tabular-nums"],
  },

  // Mesma altura da linha do valor, para o card não mudar de tamanho ao carregar.
  loader: {
    height: 24,
    alignSelf: "flex-start",
  },
});
