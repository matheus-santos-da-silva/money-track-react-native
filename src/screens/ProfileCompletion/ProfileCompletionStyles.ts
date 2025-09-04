import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    flex: 1,
  },
  profileCompletionMsg: {
    fontSize: 28,
    padding: 0,
    color: Colors.primaryGray,
    lineHeight: 24,
  },
  middleContent: {
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
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
  bottomContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
});
