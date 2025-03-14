import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: 260,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  label: {
    fontSize: 18,
    color: Colors.primaryGray,
  },
  input: {
    width: 280,
    height: 46,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.primaryGray,
    paddingLeft: 16,
    position: "relative",
    color: Colors.primaryGray,
  },
  icon: {
    position: "absolute",
    left: 246,
    bottom: 12,
    opacity: 0.9,
  },
});
