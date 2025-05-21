import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryBlue,
    paddingHorizontal: 12,
  },
  input: {
    flex: 0.9,
    height: 40,
    backgroundColor: "transparent",
    color: "white",
  },
  closeButton: {
    marginLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
});
