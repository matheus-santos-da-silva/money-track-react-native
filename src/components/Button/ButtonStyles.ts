import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  button: {
    width: 280,
    height: 70,
    backgroundColor: Colors.primaryBlue,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 30,
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
