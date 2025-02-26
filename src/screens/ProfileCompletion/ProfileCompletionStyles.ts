import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  topContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  backBtn: {
    position: "absolute",
  },
  logo: {
    flex: 1, 
    alignItems: "center",
    justifyContent: "center", 
    marginLeft: "auto", 
    marginRight: "auto", 
  },
  profileCompletionMsg: {
    fontSize: 28,
    padding: 0,
    color: Colors.primaryGray,
    lineHeight: 24,
  },
  middleContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 140,
    marginBottom: 20,
    gap: 8,
  },
  middleText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.primaryGray,
  },
  label: {
    marginLeft: 50,
  },
  btn: {
    marginRight: 16,
  },
  bottomContent: {
    gap: 6,
  },
});
