import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 12,
  },

  input: {
    flex: 0.9,
    height: 44,
    backgroundColor: "transparent",
    fontFamily: "Poppins-Regular",
    color: "white",
  },

  closeButton: {
    marginLeft: 8,
  },

  searchIcon: {
    marginRight: 8,
  },
});
