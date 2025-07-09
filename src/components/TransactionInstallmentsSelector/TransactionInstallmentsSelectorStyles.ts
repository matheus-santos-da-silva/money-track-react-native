import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

const { height: screenHeight } = Dimensions.get("window");

export const SHEET_HEIGHT = screenHeight * 0.25;

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  container: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 14,
    paddingLeft: 36,
    paddingRight: 36,
    paddingHorizontal: 20,
  },

  dragIndicator: {
    width: 50,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: Colors.primaryGray,
  },

  recurrenceContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },

  scrollContainer: {
    flexDirection: "row",
    height: "45%",
    justifyContent: "center",
    flexWrap: "nowrap",
  },

  numberButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 6,
    justifyContent: "center",
  },

  numberText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
