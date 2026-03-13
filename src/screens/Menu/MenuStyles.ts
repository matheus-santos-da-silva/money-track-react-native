import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.backgroundGray,
    flex: 1,
  },

  topBar: {
    marginBottom: 24,
  },

  content: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  userWelcomeContent: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  userWelcomeText: {
    color: Colors.primaryGray,
    fontSize: 20,
    lineHeight: 24,
    marginTop: 14,
  },

  userEmail: {
    color: Colors.primaryGray,
    fontFamily: "Poppins-Regular",
    fontSize: 13,
  },

  menuList: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    padding: 8,
    gap: 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
  },

  menuOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  menuText: {
    color: Colors.primaryGray,
    fontSize: 15,
  },

  divisionLine: {
    height: 1,
    marginHorizontal: 12,
    backgroundColor: "#EEEEEE",
  },
});
