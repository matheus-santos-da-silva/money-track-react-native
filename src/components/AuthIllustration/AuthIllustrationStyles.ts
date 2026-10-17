import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  piece: {
    position: "absolute",
    backgroundColor: Colors.surface,
    shadowColor: "rgb(6,20,70)",
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 20 },
    elevation: 10,
  },

  balanceFull: {
    left: 14,
    top: 64,
    width: 230,
    borderRadius: 22,
    padding: 18,
    gap: 8,
    transform: [{ rotate: "-6deg" }],
  },

  balanceCompact: {
    left: 0,
    top: 18,
    width: 200,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 6,
    transform: [{ rotate: "-5deg" }],
  },

  caption: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    lineHeight: 16,
    color: Colors.muted,
  },

  captionSmall: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    lineHeight: 14,
    color: Colors.muted,
  },

  balance: {
    fontFamily: Fonts.semiBold,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.5,
    color: Colors.ink,
  },

  balanceSmall: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    lineHeight: 26,
    color: Colors.ink,
  },

  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border,
    overflow: "hidden",
  },

  trackSmall: {
    height: 5,
  },

  fill: {
    width: "62%",
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.brandBlue,
  },

  balanceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  salaryFull: {
    right: 0,
    top: 0,
    borderRadius: 18,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    transform: [{ rotate: "7deg" }],
  },

  salaryCompact: {
    right: 4,
    top: 0,
    borderRadius: 16,
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    transform: [{ rotate: "7deg" }],
  },

  salaryChip: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.incomeTint,
    alignItems: "center",
    justifyContent: "center",
  },

  salaryChipSmall: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.incomeTint,
    alignItems: "center",
    justifyContent: "center",
  },

  salary: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.incomeText,
  },

  salarySmall: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.incomeText,
  },

  chart: {
    right: 8,
    bottom: 6,
    width: 140,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 8,
    transform: [{ rotate: "5deg" }],
  },

  bars: {
    height: 48,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },

  bar: {
    flex: 1,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: Colors.barIdle,
  },

  barCurrent: {
    backgroundColor: Colors.brandBlue,
  },

  bubble: {
    position: "absolute",
    borderWidth: 4,
    borderColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgb(6,20,70)",
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },

  cartColor: {
    backgroundColor: "#C2410C",
  },

  cartFull: {
    left: 22,
    bottom: 26,
    width: 52,
    height: 52,
    borderRadius: 26,
    transform: [{ rotate: "-10deg" }],
  },

  cartCompact: {
    right: 30,
    bottom: 6,
    width: 46,
    height: 46,
    borderRadius: 23,
    transform: [{ rotate: "-8deg" }],
  },

  repeat: {
    left: 96,
    backgroundColor: "#6D28D9",
    bottom: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    transform: [{ rotate: "8deg" }],
  },
});
