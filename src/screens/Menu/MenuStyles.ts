import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

const HEADER_OVERLAP = 36;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ground,
  },

  header: {
    backgroundColor: Colors.brandBlue,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 20,
    paddingBottom: 20 + HEADER_OVERLAP,
    alignItems: "center",
    gap: 4,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  avatarLetter: {
    fontFamily: Fonts.semiBold,
    fontSize: 28,
    lineHeight: 36,
    color: Colors.surface,
  },

  name: {
    fontFamily: Fonts.semiBold,
    fontSize: 19,
    lineHeight: 26,
    color: Colors.surface,
  },

  email: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.onBlueMuted,
  },

  content: {
    marginTop: -HEADER_OVERLAP,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 14,
  },

  section: {
    gap: 8,
  },

  sectionLabel: {
    paddingHorizontal: 4,
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.muted,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
  },

  deleteLink: {
    alignSelf: "center",
    height: 44,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  deleteText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.expenseText,
  },
});
