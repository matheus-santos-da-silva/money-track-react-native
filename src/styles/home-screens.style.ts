import { StyleSheet } from "react-native";
import { Colors } from "./colors";

export const homeScreensStyle = StyleSheet.create({
  topContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    maxHeight: "84%",
    width: "100%",
  },
  middleContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 12,
  },
  form: {
    gap: 12,
  },
  divisionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 24,
    width: "68%",
  },
  orLine: {
    flex: 0.5,
    height: 1,
    backgroundColor: Colors.primaryGray,
  },
  orText: {
    marginHorizontal: 10,
    fontFamily: "KonkhmerSleokchher-Regular",
    color: Colors.primaryGray,
  },
  footer: {
    width: 280,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
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
