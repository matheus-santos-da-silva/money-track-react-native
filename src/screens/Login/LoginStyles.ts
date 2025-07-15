import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    width: "100%",
    paddingVertical: 20,
  },

  loginMsg: {
    fontSize: 20,
    color: Colors.primaryGray,
  },

  bottomContent: {
    width: "100%",
    gap: height * 0.03,
  },
});
