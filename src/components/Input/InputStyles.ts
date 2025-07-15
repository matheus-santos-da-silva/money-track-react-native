import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  label: {
    fontSize: 18,
    color: Colors.primaryGray,
  },

  inputContainer: {
    width: "100%",
    position: "relative",
  },

  input: {
    width: "100%",
    height: 46,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.primaryGray,
    paddingLeft: 16,
    paddingRight: 44,
    position: "relative",
    color: Colors.primaryGray,
  },

  icon: {
    position: "absolute",
    right: 14,
    bottom: 12,
    zIndex: 2,
    opacity: 0.9,
  },
});
