import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  monthModalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  monthModal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    height: 65,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 16,
    position: "relative",
  },

  monthMarker: {
    backgroundColor: "transparent",
    width: 105,
    height: 40,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
    justifyContent: "center",
  },

  selectedMonth: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
    fontFamily: "KonkhmerSleokchher-Regular",
  },

  monthsOptionsContainer: {
    gap: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  monthsOptionsText: {
    fontSize: 12,
    color: "white",
    opacity: 0.5,
    lineHeight: 16,
  },

  leftArrowContainer: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },

  rightArrowContainer: {
    position: "absolute",
    right: 16,
    zIndex: 1,
  },

  monthsCenterContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  monthSideLeft: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 16,
  },

  monthSideRight: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 16,
  },
});
