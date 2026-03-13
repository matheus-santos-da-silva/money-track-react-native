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
    marginBottom: 8,
  },

  mainContent: {
    paddingHorizontal: 24,
    marginTop: 36,
    gap: 20,
  },

  fieldGroup: {
    gap: 8,
  },

  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  labelText: {
    color: Colors.primaryGray,
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },

  input: {
    width: "100%",
    height: 52,
    paddingLeft: 16,
    paddingRight: 48,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EBEBEB",
    color: "#1A1A2E",
    borderRadius: 14,
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  buttonDiv: {
    marginTop: 12,
  },

  inputContainer: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },

  eyeIcon: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
});
