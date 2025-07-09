import Snackbar from "react-native-snackbar";

export const showSnackBar = (text: string, backgroundColor: string) => {
  Snackbar.show({
    text,
    backgroundColor,
    duration: Snackbar.LENGTH_SHORT,
    fontFamily: "Poppins-Regular",
  });
};
