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
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: Colors.primaryGray,
  },

  categoriesContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
