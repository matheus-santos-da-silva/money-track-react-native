import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  signUpContainer: {
    justifyContent: "center",
    marginVertical: 18,
    marginRight: 10,
  },
  signUpMsg: {
    fontSize: 26,
    color: Colors.primaryGray,
  },
  signUpImage: {
    marginLeft: 14,
  },
  bottomContent: {
    alignItems: "center",
    gap: 28,
  },
});
