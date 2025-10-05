import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundGray,
    flex: 1,
  },

  topMenuContent: {
    width: "100%",
    minHeight: 160,
    maxHeight: 240,
    backgroundColor: Colors.primaryBlue,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  topContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 6,
    marginTop: 8,
  },

  logo: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },

  editProfileText: {
    fontSize: 22,
    color: "white",
  },

  mainContent: {
    width: "82%",
    marginLeft: 34,
    marginTop: 40,
    gap: 18,
  },

  label: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  labelText: {
    color: Colors.primaryGray,
    fontSize: 18,
  },

  input: {
    width: "100%",
    height: 46,
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 40,
    position: "relative",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primaryGray,
    color: Colors.primaryGray,
    borderRadius: 12,
    fontFamily: "Poppins-Regular",
  },

  buttonDiv: {
    marginTop: 18,
  },

  inputContainer: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },

  eyeIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
});
