import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 50,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 28,
    justifyContent: "center",
  },

  selected: {
    flex: 1,
    height: 50,
    backgroundColor: "white",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  boxSelector: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  options: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
});
