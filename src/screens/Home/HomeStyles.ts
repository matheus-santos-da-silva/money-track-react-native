import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

// Quanto o conteúdo sobe sobre o cabeçalho azul.
const HEADER_OVERLAP = 48;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ground,
  },

  /* Cabeçalho */
  header: {
    backgroundColor: Colors.brandBlue,
    paddingHorizontal: 20,
    paddingBottom: 20 + HEADER_OVERLAP,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    gap: 18,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarLetter: {
    fontFamily: Fonts.semiBold,
    fontSize: 17,
    lineHeight: 24,
    color: Colors.surface,
  },

  greeting: {
    flex: 1,
  },

  greetingLabel: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.onBlueMuted,
  },

  greetingName: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.surface,
  },

  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  balance: {
    alignItems: "center",
    gap: 2,
  },

  balanceLabel: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.onBlueMuted,
  },

  // paddingLeft = botão do olho + intervalo: mantém o valor centralizado na tela.
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 48,
  },

  balanceAmount: {
    flexShrink: 1,
    fontFamily: Fonts.semiBold,
    fontSize: 34,
    lineHeight: 44,
    letterSpacing: -0.5,
    color: Colors.surface,
    fontVariant: ["tabular-nums"],
  },

  /* Conteúdo */
  scroll: {
    marginTop: -HEADER_OVERLAP,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 12,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
  },

  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.ink,
  },

  /* Barra de gasto */
  spendingCard: {
    padding: 16,
    gap: 10,
  },

  spendingHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 8,
  },

  spendingText: {
    flexShrink: 1,
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
  },

  spendingPeriod: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.muted,
  },

  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    overflow: "hidden",
  },

  progressFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.brandBlue,
  },

  progressFillExceeded: {
    backgroundColor: Colors.expenseText,
  },

  /* Últimos lançamentos */
  recentSection: {
    gap: 8,
  },

  recentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  seeAllButton: {
    height: 44,
    paddingHorizontal: 4,
    justifyContent: "center",
  },

  seeAllText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.brandBlue,
  },

  recentCard: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
});
