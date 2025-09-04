import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 62,
    backgroundColor: Colors.primaryBlue,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    elevation: 7,
    flexDirection: "row",
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
  },

  buttonPressed: {
    backgroundColor: "#3769DA",
  },

  loading: {
    width: 40,
    height: 40,
  },
});
