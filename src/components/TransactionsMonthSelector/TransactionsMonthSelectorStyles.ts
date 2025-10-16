import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  monthModalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  monthModal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width: 370,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
});
