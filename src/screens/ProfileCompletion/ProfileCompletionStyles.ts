import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  profileCompletionMsg: {
    fontSize: 28,
    padding: 0,
    color: Colors.primaryGray,
    lineHeight: 24,
  },
  middleContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 140,
    marginBottom: 20,
    gap: 8,
  },
  middleText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.primaryGray,
  },
  label: {
    marginLeft: 50,
  },
  btn: {
    marginRight: 22,
  },
  bottomContent: {
    gap: 6,
  },
});
