import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
    gap: 10,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  badgeTrial: {
    backgroundColor: Colors.trialTint,
  },

  badgePremium: {
    backgroundColor: Colors.brandTintStrong,
  },

  badgeFree: {
    backgroundColor: Colors.expenseTint,
  },

  badgeText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    lineHeight: 17,
  },

  texts: {
    gap: 2,
  },

  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.ink,
  },

  text: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.muted,
  },

  button: {
    marginTop: 4,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.brandBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.surface,
  },

  link: {
    alignSelf: "flex-start",
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  linkText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.brandBlue,
  },
});
