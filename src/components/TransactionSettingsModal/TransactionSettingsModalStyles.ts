import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  container: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 14,
    paddingLeft: 30,
    paddingRight: 30,
    paddingHorizontal: 20,
  },

  dragIndicator: {
    width: 50,
    height: 4,
    borderRadius: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 12,
  },

  mainContent: {
    flexDirection: "column",
  },

  topContent: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 25,
  },

  leftTopContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  rightTopContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  transactionsTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
  },

  optionsCircle: {
    width: 34,
    height: 34,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  transactionsContent: {
    flexDirection: "column",
    gap: 20,
  },

  recurrenceContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  transactionsContentPoppinsText: {
    color: Colors.primaryGray,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    lineHeight: 18,
  },

  transactionsContentKonkhmerText: {
    color: Colors.primaryGray,
    fontSize: 17,
    lineHeight: 18,
  },
});
