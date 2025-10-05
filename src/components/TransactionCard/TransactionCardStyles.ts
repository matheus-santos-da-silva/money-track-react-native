import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  cardsContainer: {
    width: 360,
    height: 160,
    backgroundColor: "white",
    borderRadius: 20,
  },

  topCardContent: {
    width: 340,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingLeft: 12,
  },

  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  cardText: {
    color: Colors.primaryGray,
    fontSize: 20,
  },

  divisionLine: {
    height: 0.7,
    width: 320,
    alignSelf: "center",
    marginTop: 7,
    backgroundColor: Colors.primaryGray,
  },

  cardMainContent: {
    marginTop: 20,
    marginLeft: 30,
  },

  cardMainContentText: {
    color: Colors.primaryGray,
    fontSize: 31,
  },
});
