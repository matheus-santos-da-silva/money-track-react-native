import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  loginMsg: {
    fontSize: 21,
    color: Colors.primaryGray,
  },
  middleContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  form: {
    gap: 12,
  },
  containerSignUp: {
    width: 280,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 56,
    gap: 2,
  },
  text: {
    color: Colors.primaryGray,
    fontSize: 12,
  },
  questionMark: {
    fontFamily: "Acme-Regular",
  },
  signUp: {
    color: Colors.primaryBlue,
    fontSize: 12,
    marginLeft: 4,
    textDecorationLine: "underline",
  },
});
