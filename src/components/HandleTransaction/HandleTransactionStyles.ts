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
      minHeight: 180,
      maxHeight: 240,
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
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

    /* Amount Div */
    amountDiv: {
      alignItems: "center",
      marginTop: 20,
    },

    valueText: {
      fontFamily: "Poppins-Regular",
      lineHeight: 14,
      fontSize: 18,
      color: "white",
    },

    amountText: {
      color: "white",
      fontSize: 30,
      bottom: 6,
    },

    /* Type Menu */
    typeMenu: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 16,
      gap: 4,
    },

    /* Main Content */
    mainContent: {
      width: "82%",
      marginLeft: 36,
      marginTop: 48,
      gap: 20,
    },

    label: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    descriptionInput: {
      width: "100%",
      height: 42,
      alignItems: "center",
      paddingLeft: 16,
      position: "relative",
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: Colors.primaryGray,
      color: Colors.primaryGray,
      borderRadius: 16,
      fontFamily: "Poppins-Regular",
    },

    halfDiv: {
      width: "100%",
      flexDirection: "row",
      gap: "10%",
    },

    halfCard: {
      width: "45%",
      flexDirection: "column",
    },

    halfInput: {
      height: 42,
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: Colors.primaryGray,
      color: Colors.primaryGray,
      borderRadius: 16,
    },

    inputText: {
      textAlign: "center",
      lineHeight: 20,
      opacity: 0.7,
      color: Colors.primaryGray,
      fontFamily: "Poppins-Regular",
    },

    transactionContainer: {
      gap: 8,
    },

    transactionButtonsContainer: {
      width: "100%",
      flexDirection: "row",
      gap: 16,
    },

    transactionButtonWrapper: {
      flex: 1,
    },

    transactionButton: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      height: 36,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: Colors.primaryGray,
    },

    transactionButtonText: {
      color: Colors.primaryGray,
      fontSize: 10,
    },

    confirmButtonContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 18,
    },

    confirmButton: {
      width: 200,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },

    confirmButtonText: {
      color: "white",
      fontSize: 14,
    },

    /* Modal */
    modalContainer: {
      backgroundColor: "#fff",
      borderRadius: 12,
      paddingVertical: 25,
      paddingHorizontal: 30,
      width: "100%",
      maxWidth: 320,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 10,
    },

    modalTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: Colors.primaryGray,
      marginBottom: 15,
      textAlign: "center",
    },

    modalButton: {
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 10,
      alignItems: "center",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 8,
    },

    modalText: {
      fontSize: 17,
      fontWeight: "700",
      color: "#fff",
      letterSpacing: 0.5,
      textShadowColor: "rgba(0, 0, 0, 0.25)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },

    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },

    amountInput: {
      fontSize: 26,
      color: "white",
      lineHeight: 39,
      fontFamily: "KonkhmerSleokchher-Regular",
    },
  });
