import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  container: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 0,
  },

  dragIndicator: {
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginTop: 14,
    marginBottom: 20,
  },

  mainContent: {
    flexDirection: "column",
    gap: 20,
  },

  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    flexDirection: "column",
    flex: 1,
    gap: 2,
  },

  categoryName: {
    color: Colors.primaryGray,
    fontSize: 17,
    lineHeight: 22,
  },

  dateText: {
    color: Colors.primaryGray,
    fontFamily: "Poppins-Regular",
    fontSize: 13,
  },

  amountText: {
    fontFamily: "KonkhmerSleokchher-Regular",
    fontSize: 22,
    lineHeight: 26,
  },

  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#F0F0F0",
  },

  infoSection: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  infoItem: {
    alignItems: "center",
    gap: 2,
  },

  infoLabel: {
    color: "#AAAAAA",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },

  infoValue: {
    color: "#1A1A2E",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },

  descriptionSection: {
    backgroundColor: "#F8F8F8",
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },

  descriptionLabel: {
    color: "#AAAAAA",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },

  descriptionText: {
    color: Colors.primaryGray,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 20,
  },

  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },

  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 16,
    gap: 8,
  },

  editButton: {
    backgroundColor: Colors.primaryBlue,
  },

  deleteButton: {
    backgroundColor: Colors.expenseRed,
  },

  actionButtonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
  },
});
