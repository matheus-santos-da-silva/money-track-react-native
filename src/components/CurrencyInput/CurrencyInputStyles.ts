import { Colors } from "../../styles/colors";
import { Dimensions, StyleSheet } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

export const SHEET_HEIGHT = screenHeight * 0.6;

export const styles = StyleSheet.create({
  displayBox: {
    padding: 8,
    backgroundColor: "transparent",
    borderRadius: 8,
    alignItems: "center",
  },

  displayText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    fontFamily: "KonkhmerSleokchher-Regular",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  keypadContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    padding: 26,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    height: "55%",
  },

  key: {
    width: "30%",
    aspectRatio: 1,
    marginBottom: 12,
    backgroundColor: "#ddd",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  
  keyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryGray,
  },
});
