import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: Colors.backgroundGray,
    flex: 1,
  },

  content: {
    justifyContent: "center",
    alignItems: "center",
  },

  topBar: {
    marginBottom: 100,
  },

  userWelcomeContent: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    gap: 8,
  },

  userWelcomeText: {
    color: Colors.primaryGray,
    fontSize: 20,
  },

  menuList: {
    backgroundColor: "white",
    borderRadius: 16,
    width: 360,
    height: 290,
    padding: 26,
    gap: 19,
  },

  menuText: {
    color: Colors.primaryGray,
    fontSize: 16,
  },

  menuOption: {
    flexDirection: "row",
    gap: 14,
  },

  divisionLine: {
    height: 1,
    width: 310,
    alignSelf: "center",
    backgroundColor: Colors.primaryGray,
  },
});
