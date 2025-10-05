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

    grayText: {
      color: Colors.primaryGray,
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

    topRightButtons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    /* Main Content */
    mainContent: {
      gap: 16,
    },

    categoriesTitle: {
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 12,
      justifyContent: "space-between",
    },

    categoriesRows: {
      gap: 1,
    },

    addCategoryButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color,
      height: 24,
      width: 24,
      borderRadius: 50,
    },

    withoutCategory: {
      paddingHorizontal: 20,
      fontSize: 12,
      fontFamily: "Poppins-Regular",
      color: Colors.primaryGray,
    },
  });
