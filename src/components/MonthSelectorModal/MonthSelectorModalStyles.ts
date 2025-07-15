import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.primaryBlue,
  },

  monthItem: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },

  monthText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
});
