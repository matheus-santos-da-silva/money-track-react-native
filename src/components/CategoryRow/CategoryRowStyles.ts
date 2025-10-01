import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 68,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  leftContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingLeft: 18,
  },

  rightContent: {
    paddingRight: 18,
    alignItems: "center",
  },

  titleText: {
    color: Colors.primaryGray,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    maxWidth: 180,
  },
});
