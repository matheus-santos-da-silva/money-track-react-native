import { Colors } from "../../styles/colors";
import { Dimensions, StyleSheet } from "react-native";

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

  optionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#f0f0f3",
    alignItems: "center",
  },

  selectedOption: {
    shadowColor: "rgba(0,0,0,0.4)",
  },

  optionText: {
    color: Colors.primaryGray,
    fontSize: 15,
    letterSpacing: 0.4,
  },

  selectedOptionText: {
    color: "white",
  },
});
