import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  content: {
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryName: {
    fontSize: 18,
    color: Colors.primaryGray,
    fontFamily: "KonkhmerSleokchher-Regular",
  },
  actionsContainer: {
    width: "100%",
    gap: 12,
  },
  actionButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  editButton: {
    backgroundColor: Colors.primaryBlue,
  },
  deleteButton: {
    backgroundColor: Colors.expenseRed,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});
