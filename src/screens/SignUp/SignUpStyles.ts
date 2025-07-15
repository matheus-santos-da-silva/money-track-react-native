import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    width: "100%",
    paddingVertical: 16,
  },

  signUpMsg: {
    fontSize: 22,
    color: Colors.primaryGray,
  },

  bottomContent: {
    width: "100%",
    alignItems: "center",
    gap: height * 0.03,
  },
});
