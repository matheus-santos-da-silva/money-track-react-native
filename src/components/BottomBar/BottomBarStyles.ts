import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bottomMenu: {
    height: 60,
    elevation: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#F1F1F1",
  },
  menuButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  svgContainer: {
    position: "absolute",
    top: -20,
    left: "51%",
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 46,
  },
});
