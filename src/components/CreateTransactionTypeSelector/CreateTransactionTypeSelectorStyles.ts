import { Colors } from "../../styles/colors";
import { Dimensions, StyleSheet } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

export const SHEET_HEIGHT = screenHeight * 0.42;

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  container: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
  },

  dragIndicator: {
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginBottom: 24,
  },

  titleContainer: {
    alignItems: "center",
    marginBottom: 28,
  },

  title: {
    fontSize: 19,
    textAlign: "center",
    color: Colors.primaryGray,
    fontFamily: "KonkhmerSleokchher-Regular",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 13,
    color: "#AAAAAA",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },

  optionsContainer: {
    flexDirection: "row",
    gap: 14,
  },

  optionButton: {
    flex: 1,
    paddingVertical: 22,
    borderRadius: 22,
    alignItems: "center",
    gap: 8,
  },

  optionText: {
    color: "white",
    fontFamily: "KonkhmerSleokchher-Regular",
    fontSize: 16,
    letterSpacing: 0.3,
  },

  optionSubtitle: {
    color: "rgba(255,255,255,0.72)",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },

  expenseButton: {
    backgroundColor: Colors.expenseRed,
  },

  incomeButton: {
    backgroundColor: Colors.incomeGreen,
  },
});
