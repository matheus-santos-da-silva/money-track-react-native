import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 14,
  },
  loginMsg: {
    fontSize: 24,
    color: Colors.primaryGray,
  },
  bottomContent: {
    gap: 30,
  },
});
