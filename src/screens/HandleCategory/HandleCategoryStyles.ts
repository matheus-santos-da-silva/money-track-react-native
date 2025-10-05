import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = (color: string) =>
  StyleSheet.create({
    menuColor: {
      backgroundColor: color,
    },

    confirmButtonColor: {
      backgroundColor: color,
    },

    container: {
      backgroundColor: Colors.backgroundGray,
      flex: 1,
    },

    /* Top Menu */
    topMenu: {
      width: "100%",
      flex: 0.3,
      minHeight: 120,
      maxHeight: 150,
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      paddingBottom: 24,
    },

    /* Logo and BackBtn */
    topLogo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 10,
      marginTop: 10,
    },

    logo: {
      position: "absolute",
      left: 0,
      right: 0,
      alignItems: "center",
    },

    /* Main Content */
    mainContent: {
      gap: 36,
      paddingHorizontal: 30,
      paddingTop: 36,
    },

    categoryNameInput: {
      width: "100%",
      height: 46,
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 16,
      position: "relative",
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: Colors.primaryGray,
      color: Colors.primaryGray,
      borderRadius: 16,
      fontFamily: "Poppins-Regular",
    },

    chooseData: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    addButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color,
      height: 24,
      width: 24,
      borderRadius: 50,
    },

    justify: {
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
    },

    chooseIcon: {
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
    },

    choosedIcon: {
      backgroundColor: color,
      height: 70,
      width: 70,
      borderRadius: 36,
      justifyContent: "center",
      alignItems: "center",
    },

    confirmButtonContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 18,
    },

    confirmButton: {
      width: 260,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      elevation: 6.3,
    },
  });
