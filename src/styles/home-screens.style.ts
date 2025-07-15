import { StyleSheet } from "react-native";
import { Colors } from "./colors";

export const homeScreensStyle = StyleSheet.create({
  topContent: {
    alignItems: "center",
    gap: 16,
  },

  mainContent: {
    flex: 1,
    maxHeight: "80%",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 48,
  },

  middleContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "100%",
    gap: 12,
    maxWidth: 400,
  },

  divisionContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  orLine: {
    flex: 0.5,
    height: 1.1,
    backgroundColor: Colors.primaryGray,
  },

  orText: {
    marginHorizontal: 10,
    fontFamily: "KonkhmerSleokchher-Regular",
    color: Colors.primaryGray,
  },

  footer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
