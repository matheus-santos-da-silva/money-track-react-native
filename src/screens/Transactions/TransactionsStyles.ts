import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

// Quanto o conteúdo sobe sobre o cabeçalho azul.
const HEADER_OVERLAP = 40;

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
    gap: 14,
  },

  titleRow: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    flex: 1,
    fontFamily: Fonts.semiBold,
    fontSize: 22,
    lineHeight: 30,
    color: Colors.surface,
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  filterDot: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: Colors.surface,
  },

  /* Lista */
  list: {
    marginTop: -HEADER_OVERLAP,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  listHeader: {
    gap: 14,
    marginBottom: 14,
  },

  listLoader: {
    marginTop: 48,
  },

  footerLoader: {
    marginTop: 16,
  },

  /* Resumo do período */
  summaryCard: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 8,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },

  summaryColumn: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },

  summaryMiddleColumn: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.divider,
  },

  summaryLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.muted,
  },

  summaryValue: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
    fontVariant: ["tabular-nums"],
  },

  // Mesma altura da linha do valor, para o card não mudar de tamanho ao carregar.
  summaryLoader: {
    height: 20,
  },

  income: {
    color: Colors.incomeText,
  },

  expense: {
    color: Colors.expenseText,
  },

  balance: {
    color: Colors.ink,
  },

  /* Filtros */
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },

  results: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
  },

  /* Grupos por dia */
  dayHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 6,
  },

  dayTitle: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
  },

  dayTotal: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
    fontVariant: ["tabular-nums"],
  },

  // A sobreposição de 1 px evita a fresta que o arredondamento de pixels deixa entre
  // as linhas de um mesmo card.
  rowCard: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    marginBottom: -1,
    paddingBottom: 1,
  },

  rowCardFirst: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 4,
  },

  // A margem separa o card do próximo grupo.
  rowCardLast: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 4,
    marginBottom: 14,
  },
});
