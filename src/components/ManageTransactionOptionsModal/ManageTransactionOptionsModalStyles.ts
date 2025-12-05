import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryGray,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "KonkhmerSleokchher-Regular",
  },

  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
},

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 12,
  },

  optionButton: {
    width: "90%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryBlue,
  },

  optionText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
  },

  cancelButton: {
    width: "90%",
    marginTop: 8,
    paddingVertical: 10,
    backgroundColor: Colors.expenseRed,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
  },
});
