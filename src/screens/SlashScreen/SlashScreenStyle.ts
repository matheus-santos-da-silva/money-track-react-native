import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBlue,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  middleContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    flexGrow: 1,
  },
  logo: {
    width: 140,
    height: 184,
  },
  loadingGif: {
    width: 30,
    height: 30,
  },
  bottomText: {
    fontSize: 26,
    color: "#FFFFFF",
  },
  bottomContent: {
    marginBottom: 10,
    alignItems: "center",
  },
});
