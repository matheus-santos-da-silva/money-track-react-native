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
    paddingBottom: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    gap: 14,
  },

  titleRow: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  searchRow: {
    paddingHorizontal: 8,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    flex: 1,
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    lineHeight: 28,
    color: Colors.surface,
  },

  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  typeSwitch: {
    marginHorizontal: 8,
  },

  content: {
    paddingTop: 20,
    paddingHorizontal: 20,
    gap: 22,
  },

  loader: {
    marginTop: 64,
  },

  section: {
    gap: 8,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },

  sectionHeading: {
    paddingHorizontal: 4,
    gap: 2,
  },

  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.ink,
  },

  sectionCount: {
    fontFamily: Fonts.regular,
    color: Colors.muted,
  },

  sectionCaption: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.muted,
  },

  newButton: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  newButtonText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.brandBlue,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
  },

  userCard: {
    paddingLeft: 16,
    paddingRight: 8,
  },

  defaultCard: {
    paddingHorizontal: 16,
  },

  empty: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: Colors.borderStrong,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 8,
  },

  emptyChip: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.chip,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 4,
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.ink,
    textAlign: "center",
  },

  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.muted,
    textAlign: "center",
  },

  emptyButton: {
    marginTop: 6,
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: Colors.brandBlue,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  emptyButtonText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.surface,
  },

  noResults: {
    marginTop: 48,
    alignItems: "center",
    gap: 4,
  },

  noResultsTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.ink,
  },

  noResultsText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.muted,
  },
});
