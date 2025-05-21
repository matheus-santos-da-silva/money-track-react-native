import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    width: "90%",
    height: 330,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
    color: Colors.primaryGray,
  },
  option: {
    gap: 18,
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    color: Colors.primaryGray,
  },

  label: {
    marginLeft: 10,
    fontSize: 10,
  },

  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  optionsView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  applyButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: Colors.primaryBlue,
    borderRadius: 8,
    alignItems: "center",
  },

  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
