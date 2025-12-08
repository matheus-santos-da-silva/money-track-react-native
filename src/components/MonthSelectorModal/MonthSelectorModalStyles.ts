import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
  },

  modalTitle: {
    fontSize: 17,
    marginBottom: 20,
    color: Colors.primaryBlue,
  },

  yearContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 25,
    gap: 20,
  },

  arrowButton: {
    padding: 8,
    backgroundColor: "#F0F9FF",
    borderRadius: 50,
  },

  yearText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primaryBlue,
    fontFamily: "Poppins-Regular",
  },

  monthsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 5,
    rowGap: 10,
  },

  monthItem: {
    width: "48%",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#F3F7FF",
    marginBottom: 5,
  },

  monthText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: Colors.primaryBlue,
  },
});
