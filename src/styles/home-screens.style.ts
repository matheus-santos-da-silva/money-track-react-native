import { StyleSheet } from "react-native";
import { Colors } from "./colors";

export const homeScreensStyle = StyleSheet.create({
  container: {
    padding: 16,
  },
  topContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  middleContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  form: {
    gap: 12,
  },
  footer: {
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
  bottomLink: {
    color: Colors.primaryBlue,
    fontSize: 12,
    marginLeft: 4,
    textDecorationLine: "underline",
  },
});
