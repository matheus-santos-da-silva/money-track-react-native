import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

const { height: screenHeight } = Dimensions.get("window");

export const SHEET_HEIGHT = screenHeight * 0.6;

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
    padding: 12,
  },

  dragIndicator: {
    width: 50,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: Colors.primaryGray,
  },

  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
